let EnemyIdleState = {
  update: function() {
    
  }
}

let EnemyReturnState = {
  update: function() {    
    this.actor.setLocalX(this.startPos.x); 
    Sup.log(this.actor.getLocalPosition().distanceTo(this.startPos));
    if (this.actor.getLocalPosition().distanceTo(this.startPos) < 0.02) {
      this.actor.setLocalY(this.startPos.y);       
      this.state = EnemyIdleState;
    } else {
      this.actor.move(0, -this.speed);
    }
  }
}

let EnemyFlyState = {  
  update: function() {
    let dx = 0.035 * this.dir;
    // Add player position and acc
    if (this.actor.getX() + dx < -2 || this.actor.getX() + dx > 2) {
      this.dir = -this.dir;
      dx = 0;
    }
    
    
    
    this.actor.move(dx, -this.speed);
    
    if (this.actor.getY() < -3) {
      this.actor.setY(3);      
      this.state = EnemyReturnState;
    }
  }  
}

class EnemyBehavior extends Sup.Behavior {
  public state;
  public speed: Number = 0.02;
  public startPos: Sup.Math.Vector3;
  public acc: Number = 0;
  public dir: Number = 1;
  public player: Sup.Actor;
  
  awake() {
    this.player = Sup.getActor('Player');
    this.startPos = new Sup.Math.Vector3(0, 0, 0);
    this.state = EnemyIdleState;
  }

  update() {
    this.state.update.call(this);    
    if (Game.isRun) {
      if (this.actor.getPosition().distanceTo(this.player.getPosition()) < 0.3) {
        this.player
          .getBehavior(PlayerBehavior)
          .destroy();
      }  
    }
      
  }

  destroy() {
    let explosion = Sup.appendScene('Prefabs/Enemy Explosion/Prefab')[0];
    explosion.setPosition(this.actor.getPosition().clone());
    this.actor.destroy();
  }
}
Sup.registerBehavior(EnemyBehavior);

