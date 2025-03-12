const usuario = JSON.parse(localStorage.getItem('Usuario'));
const usuarioLogado = document.getElementById('usuarioLogado');


usuarioLogado.innerText= usuario.usuario;
const carregaMenssagens =(nome)=>{
    console.log(nome);
    
    const chat = document.getElementById('chat');
    chat.classList.add('active');
    chat.innerHTML=`
        <!-- Heading -->
    <div class="row heading" >
      <div class="col-sm-2 col-md-1 col-xs-3 heading-avatar">
        <div class="heading-avatar-icon">
          <img src="img/user 2.png">
        </div>
      </div>
      <div class="col-sm-8 col-xs-7 heading-name">
        <a class="heading-name-meta">${nome}
        </a>
        <span class="heading-online">Online</span>
      </div>
      <div class="col-sm-1 col-xs-1  heading-dot pull-right">
        <i class="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
      </div>
    </div>
    <!-- Heading End -->

    <!-- Message Box -->
    <div class="row message" id="conversation">

      <div class="row message-previous">
        <div class="col-sm-12 previous">
          <a onclick="previous(this)" id="Sush" name="20">
          Messagens
          </a>
        </div>
      </div>

      <div class="row message-body">
        <div class="col-sm-12 message-main-receiver">
          <div class="receiver">
            <div class="message-text">
             /nova menssagem
            </div>
            <span class="message-time pull-right">
              8:56 pm
            </span>
          </div>
        </div>
      </div>

      <!--<div class="row message-body">
        <div class="col-sm-12 message-main-sender">
          <div class="sender">
            <div class="message-text">
              Bem, e vc?
            </div>
            <span class="message-time pull-right">
              9:05 pm
            </span>
          </div>
        </div>
      </div>-->
    </div>
    <!-- Message Box End -->

    <!-- Reply Box -->
    <div class="row reply">
      <div class="col-sm-1 col-xs-1 reply-emojis">
        <i class="fa fa-smile-o fa-2x"></i>
      </div>
      <div class="col-sm-9 col-xs-9 reply-main">
        <textarea class="form-control" rows="1" id="comment"></textarea>
      </div>
      <div class="col-sm-1 col-xs-1 reply-recording">
        <i class="fa fa-microphone fa-2x" aria-hidden="true"></i>
      </div>
      <div class="col-sm-1 col-xs-1 reply-send">
        <i class="fa fa-send fa-2x" aria-hidden="true"></i>
      </div>
    </div>
    <!-- Reply Box End -->
  </div>

    
    `;
}