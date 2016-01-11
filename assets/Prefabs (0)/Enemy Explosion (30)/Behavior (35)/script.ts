class ExplosionBehavior extends Sup.Behavior {
  awake() {
    this.actor.spriteRenderer.setAnimation('play', false);
  }

  update() {
    if (this.actor.spriteRenderer.isAnimationPlaying() == false) {
      this.actor.destroy();
    }
  }
}
Sup.registerBehavior(ExplosionBehavior);
