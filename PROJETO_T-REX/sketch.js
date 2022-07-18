let trex, trexCorrendo, trexMorto;
let chao, chaoImagem, chaoInvisivel;
let nuvemImg;
let numAleat;
let cactoimg1, cactoimg2, cactoimg3;
let cactoimg4, cactoimg5, cactoimg6;
let pontos = 0;
let gameOver, restart;
let gameOverImg, restartImg;
let grupocactos, gruponuvens;

let JOGANDO = 1;
let PERDEU = 0;
let estado = JOGANDO;

let sompulo, sommorte, somcheckpoint;

// Funçao para carregar os arquivos que vao ser usados
function preload() {
  trexCorrendo = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexMorto = loadAnimation("trex_collided.png" )
  chaoImagem = loadImage("ground2.png");
  nuvemImg = loadImage("cloud.png");
  cactoimg1 = loadImage("obstacle1.png");
  cactoimg2 = loadImage("obstacle2.png");
  cactoimg3 = loadImage("obstacle3.png");
  cactoimg4 = loadImage("obstacle4.png");
  cactoimg5 = loadImage("obstacle5.png");
  cactoimg6 = loadImage("obstacle6.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

  sompulo = loadSound("jump.mp3");
  sommorte = loadSound("die.mp3");
  somcheckpoint = loadSound("checkpoint.mp3");
}

// Função que vai ser executada apenas uma vez
function setup(){
  createCanvas(600,200);

  grupocactos = new Group();
  gruponuvens = new Group();



  //cria os sprites e os configura
  trex = createSprite(50,150,20,50);
                     
  //texto sobre a animaçao , variavel da img
  trex.addAnimation("trex quando está correndo", trexCorrendo);
  trex.addAnimation("trex quando morreu", trexMorto);
  trex.scale = 0.5;
  trex.depth = 2;
  trex.debug = true;
  trex.setCollider("Circle",0,0,30);

  // cria e configura o chao
  chao = createSprite(300,175,600,10);
  chao.addImage("chao do jogo", chaoImagem);
  chao.velocityX = -3;

  chaoInvisivel = createSprite(300,190,600,10);
  chaoInvisivel.visible = false;

  // cria os sprites de fim de jogo
  gameOver = createSprite(300,80);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;

  restart = createSprite(300,120);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;



  
}

// Função que vai ser executada em loop
function draw(){
  background("white");

  
  
  if(estado === JOGANDO){
    numAleat = Math.round(random(10,100));

    pular();
    criaNuvens();
    criaObstaculos();
    pontuacao();
    infinity();

    // trex colide com o chao (nao cai)
    trex.collide(chaoInvisivel);

    if(trex.isTouching(grupocactos)){
      estado = PERDEU;
      sommorte.play();
    }

    //verifica o checkpoint
    if(pontos%1000 === 0 && pontos > 0){
      somcheckpoint.play();
    }
  }

  if(estado === PERDEU){
    chao.velocityX = 0;
    trex.velocityX = 0;
    trex.velocityY = 0;
    grupocactos.setVelocityXEach(0);
    gruponuvens.setVelocityXEach(0);

    gameOver.visible = true;
    restart.visible = true;

    grupocactos.setLifetimeEach(-1);
    gruponuvens.setLifetimeEach(-1);
    
    trex.changeAnimation("trex quando morreu");

if(mousePressedOver(restart)){
  reiniciar();
}

  }

  drawSprites();
}

// funcao que permite o dino a pular
function pular() {
    //keyIsDown(UP_ARROW)
  if(keyDown("space") && trex.isTouching(chao) ){
    trex.velocityY = -13;
    sompulo.play();
  }
  trex.velocityY += 0.8;  
}

// funcao que permite o chao ser infinito (nao acabar nunca)
function infinity() {
  if(chao.x < 0){
    chao.x = chao.width/2;
  }
}

// funcao que gera as nuvens
function criaNuvens() {
  if (frameCount%150 === 0|| frameCount === 1){
    let nuvem = createSprite(610,numAleat,20,15);
    nuvem.velocityX = -1;
    nuvem.addImage(nuvemImg);
    nuvem.scale = 0.7;
    nuvem.depth = 1;
    nuvem.lifetime = 650;
    gruponuvens.add(nuvem);
  }
}

// funcao que gera os cactos
function criaObstaculos() {
  if (frameCount%80 === 0 || frameCount === 5){
    var cacto = createSprite(610,160,20,15);
    cacto.velocityX = -3;
    cacto.scale = 0.5;
    cacto.depth = 1;
    cacto.lifetime = 500;
    
    var escolha = Math.round(random(1,6));
    switch(escolha){
      case 1:
        cacto.addImage(cactoimg1);
        break;
      case 2:
        cacto.addImage(cactoimg2);
        break;
      case 3:
        cacto.addImage(cactoimg3);
        break;
      case 4:
        cacto.addImage(cactoimg4);
        break;
      case 5:
        cacto.addImage(cactoimg5);
        break;
      case 6:
        cacto.addImage(cactoimg6);
        cacto.scale = 0.4;
        break;

      default: break;
    }
    grupocactos.add(cacto);
  }
}

// funcao que calcula e exibe a pontuação
function pontuacao() {
  text("PONTUAÇÃO: " + pontos, 400,50);
  pontos = pontos + Math.round(getFrameRate()/60);
}



function reiniciar(){
    estado = JOGANDO;
    pontos = 0;
    chao.velocityX = -3

    grupocactos.destroyEach();
    gruponuvens.destroyEach();

    restart.visible = false
    gameOver.visible = false;

    trex.changeAnimation("trex quando está correndo");
  }
