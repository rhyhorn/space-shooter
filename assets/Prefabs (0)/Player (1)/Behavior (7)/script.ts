class PlayerBehavior extends Sup.Behavior {
  speed: number = 0.05;
  
  awake() {
    
  }

  update() {
    let moveDelta = new Sup.Math.Vector2(0, 0);
    
    if (Sup.Input.wasKeyJustPressed('W')) {
      let pos = this.actor.getPosition();
      let bulltetActor = null;
      
      bulltetActor = Sup.appendScene('Prefabs/Player Bullet/Prefab')[0];  
      bulltetActor.setPosition(pos.clone().add(-0.09, 0.1, 0));
      
      bulltetActor = Sup.appendScene('Prefabs/Player Bullet/Prefab')[0];  
      bulltetActor.setPosition(pos.clone().add(0.09, 0.1, 0));
    }
    
    if (Sup.Input.isKeyDown('A')) {
      moveDelta.x = -1;
    } else if (Sup.Input.isKeyDown('D')) {
      moveDelta.x = 1;
    }
    
    this.actor.move(moveDelta.multiplyScalar(this.speed));    
  }

  destroy() {
    let explosion = Sup.appendScene('Prefabs/Enemy Explosion/Prefab')[0];
    explosion.setPosition(this.actor.getPosition().clone());
    Game.playerDestroyed();
    this.actor.destroy();
  }
}

Sup.registerBehavior(PlayerBehavior);
