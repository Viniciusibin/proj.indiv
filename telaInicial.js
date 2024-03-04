// criando uma class para o código ficar mais organizado

class TelaInicial extends Phaser.Scene {
    constructor() {
      super({ key: "TelaInicial" });
    }
  
    preload() {
      // adicionando imagens
      this.load.image("background", "assets/background.jpg");
      this.load.image("startButton", "assets/start.jpg");
     
    }
  
    create() {
      
      // Adiciona o fundo
      gameState.telaBackground = this.add.image(gameState.larguraJogo / 2, gameState.alturaJogo / 2, "background");
      gameState.telaBackground.setScale(gameState.alturaJogo / gameState.telaBackground.height);
      console.log(gameState.alturaJogo / gameState.telaBackground.height);
  
      // Adiciona o botão de Start
      gameState.startButton = this.add.image(610, 480, "startButton");
      gameState.startButton.setInteractive();
      gameState.startButton.on("pointerdown", () => {
        this.scene.start("TelaJogo");
        // Adicione aqui a lógica para iniciar o jogo ou mudar para a próxima cena
        console.log("Iniciar jogo!");
        this.scene.stop("TelaInicial");
        });
        this
        gameState.texto = this.add.text(300, 300, 'pegue o máximo de moedas utilizando o cursor!', { fontSize: '20px', fill: '#FFFFFF' });
    
      }


  }
  