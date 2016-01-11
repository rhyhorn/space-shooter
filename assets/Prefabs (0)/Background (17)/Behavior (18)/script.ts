class BackgroundBehavior extends Sup.Behavior {
  public speed = 0.05;

  awake() {
    
  }

  update() {
    let posY = this.actor.getY();
    posY -= this.speed;
    
    posY = posY < -9 ? 3 : posY;
    
    this.actor.setY(posY);
  }
}
Sup.registerBehavior(BackgroundBehavior);
