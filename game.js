var gameState = {
    larguraJogo: window.innerWidth,
    alturaJogo: window.innerHeight,
  };
  
  var config = {
    type: Phaser.AUTO,
    width: gameState.larguraJogo,
    height: gameState.alturaJogo,
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
  