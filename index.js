import express from 'express';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Server } from 'socket.io';
import bcrypt from "bcrypt";

import { User } from './models/usuario.js';

import jwt from 'jsonwebtoken';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { TOKEN, business_phone_number_id } = process.env;

const URL =`https://graph.facebook.com/v21.0/${business_phone_number_id}/messages`;

const app = express();

app.use(express.json());
const server = createServer(app);
const io = new Server(server);
app.use(express.static (join (__dirname, 'public' )));
app.set('views',join(__dirname,'public'));
app.set('view engine','html');

io.on('connection', (socket) => {
  
  socket.on('messageEnviada', (msg) => {
              console.log(msg);
              
              const options ={
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization":" Bearer "+TOKEN
                },
                body: JSON.stringify({
                        "messaging_product": "whatsapp",
                        "recipient_type": "individual",
                        "to": "5561993609551",
                        "type": "text",
                        "text": {
                            "preview_url": "false",
                            "body": msg
                        }
                  })
          }
          fetch(URL,options)
              .then(json =>json.json())
              .then(err=>{})
                         io.emit('messageEnviada',msg.text)
                            
  });
});

app.post('/webhook',async(req,res)=>{ 
  const msg={
      nome:req.body.name,
      telefone:req.body.from,
      timeStamp:req.body.text.timestamp,
      texto:req.body.text.body

  };
  
 
  

    
    io.emit('recebida',msg);
    res.sendStatus(200);
     
});
app.post('/cadastrar-usuario', async(req,res)=>{
  const usuario = await User.findOne({
    where:{
      'usuario':req.body.usuario
    }
  })
  if(usuario){
    res.status(400).json({
      'erro':true,
      'msg':'Usuario já cadastrado deseja fazer login?'
    })
    
  }else{
    req.body.senha = await bcrypt.hash(req.body.senha,10);
    await User.create(req.body);

    res.status(200).json({
      'erro':false,
      'msg':'usuario cadastrado com sucesso'
    })
  }
  
  
  
  
  
})
app.post('/login', async(req,res)=>{
   const usuario = await User.findOne({
    attributes:['usuario','senha'],
    where:{
      'usuario':req.body.usuario
    }
  })
   
  if(!usuario){
    res.status(400).json({
      'erro':true,
      'msg':'Usuario ou senha invalida!'
    })
  }else{
    const senhac = await bcrypt.compare(req.body.senha,usuario.senha)
       
      if(!senhac){
        res.status(400).json({
          'erro':true,
          'msg':'Usuario ou senha invalida!'
        })
      }else{
      var key =   jwt.sign({
          usuario: req.body.usuario
        }, 'TOKEN', { expiresIn: '1h' });

        res.status(200).json({
          'erro':false,
          'msg':'Login realizado com sucesso!',
          'usuario': req.body.usuario,
          'token':key
        })
    }
    
  }
  
  
  
 
  
})

app.get('/', (req, res) => {
  res.render('index');
});


server.listen(process.env.PORT||3000, () => {
  console.log('servidor iniciado 3000');
});