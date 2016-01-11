class BulletBehavior extends Sup.Behavior {
  public direction = new Sup.Math.Vector2(0, 1);
  public speed = 0.05;

  awake() {
    
  }

  update() {
    let delta = this.direction.clone()
                  .multiplyScalar(this.speed);
    this.actor.move(delta);
    
    if (this.actor.getY() > 3 || this.actor.getY() < -3) {
      this.actor.destroy();
    }  
    
    Sup.getActor('Enemies')
      .getChildren()
      .forEach((enemy) => {
        if (enemy.getPosition().distanceTo(this.actor.getPosition()) < 0.2) {
          enemy.getBehavior(EnemyBehavior)
                .destroy();
          this.actor.destroy();
          
          Game.checkWin();
        }
      });
    
  }
}

Sup.registerBehavior(BulletBehavior);
