namespace Game {
  export let isRun = true;
  export function playerDestroyed() {
    Game.isRun = false;
    Sup.getActor('Lose Message')
        .setY(0);
  }  
  export function checkWin() {
    
    if (Sup.getActor('Enemies').getChildren().length === 0) {
      Game.isRun = false;
      Sup.getActor('Win Message')
        .setY(0);
    }
  }
}