class GameSceneBehavior extends Sup.Behavior {
  lastLaunch = 0;
  dir = 0.008;
  update() {
    let x = this.actor.getX();
    
    if (x + this.dir > 1 || x + this.dir < -1) {
      this.dir = -this.dir;
    } else {
      this.actor.setX(x + this.dir);      
    }    
    
    this.lastLaunch++;
    if (this.lastLaunch > 120) {
      this.launchEnemy();
      this.lastLaunch = 0;
    }
    
    if (Game.isRun === false) {
      if (Sup.Input.wasKeyJustReleased('SPACE')) {
        Game.isRun = true;
        Sup.loadScene('Scenes/Game/Scene');
      }
    }    
  }

  launchEnemy() {
    let enemies = Sup.getActor('Enemies').getChildren();
    let toLaunch = [];
    
    enemies.forEach((actor) => {
      let enemy = actor.getBehavior(EnemyBehavior);
      if (enemy.state == EnemyIdleState) {
        toLaunch.push(actor);
      }  
    });
    
    if (toLaunch.length > 0) {     
      let index =  Sup.Math.Random.integer(0, toLaunch.length - 1);
      let actor: Sup.Actor = toLaunch[index];
      let enemy: EnemyBehavior = actor.getBehavior(EnemyBehavior);
      
      enemy.startPos.set(actor.getLocalX(), actor.getLocalY(), 0);
      enemy.state = EnemyFlyState;
    }    
  }
}
Sup.registerBehavior(GameSceneBehavior);
