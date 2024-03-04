var gameState = {
   // definindo tamanho do jogo igual a largura da tela 
    larguraJogo: window.innerWidth,
    alturaJogo: window.innerHeight,
  };
  
  var config = {
    type: Phaser.AUTO,
    //definindo no jogo
    width: gameState.larguraJogo,
    height: gameState.alturaJogo,
    //definindo a física
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 300 },
        debug : true
      },
    },
    scene: [TelaInicial, TelaJogo],
  };
  var game = new Phaser.Game(config);
  