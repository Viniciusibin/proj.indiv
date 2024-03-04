class TelaJogo extends Phaser.Scene {
  constructor() {
    super({ key: "TelaJogo" });
  }
//adicionando as imagens
  preload() {
    this.load.image("background", "assets/background.jpg");
    this.load.spritesheet("player", "assets/player.png", { frameWidth: 146, frameHeight: 150 });
    this.load.image("platforms", "assets/tijolos.png");
    this.load.image("moeda", "assets/moeda.png");
    this.load.image("chao", "assets/chao.png");
  }
//criando as imagens
  create() {
    // Adiciona a imagem de fundo
    this.add.image(gameState.larguraJogo / 2, gameState.alturaJogo / 2, "background");
  //criando um chão para o player pular
    gameState.chao = this.physics.add.sprite(600, 700, "chao").setScale(4.7);
    //tirando a gravidade do chão
    gameState.chao.body.setAllowGravity(false);
    //deixando o chão estático
    gameState.chao.body.setImmovable(true);

    // Cria as plataformas
    gameState.platforms = this.physics.add.staticGroup();
    //gameState.platforms.create(400, 568, "platforms").setScale(1).refreshBody();
    gameState.platforms.create(900, 400, "platforms").setScale(1);
    gameState.platforms.create(150, 240, "platforms").setScale(1);
    gameState.platforms.create(450, 350, "platforms").setScale(1);

    // Adiciona o jogador
    gameState.player = this.physics.add.sprite(100, 450, "player");
    //adicionando quique
    gameState.player.setBounce(0.2);
    //adicionando colisão nas bordas
    gameState.player.setCollideWorldBounds(true);

    // Adiciona animações
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "stop",
      frames: this.anims.generateFrameNumbers("player", { start: 6, end: 8 }),
      frameRate: 20,
      repeat: -1,
    });

    // Adiciona o cursor
    gameState.cursors = this.input.keyboard.createCursorKeys();

    // Colisão entre jogador e plataformas
    this.physics.add.collider(gameState.player, gameState.platforms);

    // Configurações da moeda
    gameState.moeda = this.physics.add.sprite(20, 0, "moeda");
    gameState.moeda.setCollideWorldBounds(true);
    gameState.moeda.body.setGravityY(300);
    gameState.moeda.setBounce(0.7);
    this.physics.add.collider(gameState.moeda, gameState.platforms);
    this.physics.add.collider(gameState.chao, gameState.player);

    // Texto do placar
    gameState.score = 0;
    gameState.placar = this.add.text(50, 125, "Moedas: 0", { fontSize: "45px", fill: "#495613" });

    // Sobreposição entre jogador e moeda
    this.physics.add.overlap(gameState.player, gameState.moeda, function () {
      gameState.moeda.setVisible(false);
      gameState.posicaoMoeda_Y = Phaser.Math.RND.between(300, 750);
      gameState.moeda.setPosition(gameState.posicaoMoeda_Y, 100);
      gameState.score++;
      gameState.placar.setText("Moedas:" + gameState.score);
      gameState.moeda.setVisible(true);
    });
    let minhaLista = [];

    // Adicionando elementos à lista
    minhaLista.push("Elemento 1");
    minhaLista.push("Elemento 2");
    minhaLista.push("Elemento 3");

    // Imprimindo a lista atualizada
    console.log("Lista após alterações:", minhaLista); // Saída: ["Elemento 1", "Novo Elemento"]

    for (let count = 0; count < minhaLista.length; count++) {
      console.log(minhaLista[count]);
    }
  }

  update() {
    // funcao de movimeneto do player
    this.movimentoPlayer();
  }

  movimentoPlayer() {
    // Movimento do jogador
    if (gameState.cursors.left.isDown) {
      gameState.player.setVelocityX(-160);
      gameState.player.anims.play("left", true);
    } else if (gameState.cursors.right.isDown) {
      gameState.player.setVelocityX(160);
      gameState.player.anims.play("right", true);
    } else {
      gameState.player.setVelocityX(0);
      gameState.player.anims.play("stop");
    }

    // Verifica se o jogador está tocando no chão e permite o pulo
    if (gameState.cursors.up.isDown && gameState.player.body.touching.down) {
      gameState.player.setVelocityY(-450);
    }
  }
}
