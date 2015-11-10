# **RSGUI!**
GUI library for your Phaser games.
> **Features**

 - Built-in GUI components 
 - Theme support 
 - Easy to use

-------------------
> **Usage**

    var game = new Phaser.Game(480, 320, Phaser.CANVAS,
    '', {preload:preload,create:create});
    game.gui = new RSCanvasGUI(game);
    //load custom theme if required
    game.gui.loadTheme('theme.json');
    function preload() {
      //load theme assets if required
      game.gui.loadAsset();
    }
    function create() {
      //add a gui component -- button
      button1 = game.gui.add.button(0,0,"button");
    }
    
> **For More Example visit [http://redsheep.github.io/RSGUI/](http://redsheep.github.io/RSGUI/)**