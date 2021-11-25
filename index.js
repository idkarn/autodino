function autoplay() {
  setTimeout(function () {
    instance = this.Runner.instance_;
    obstacles = instance.horizon.obstacles;

    if (instance.tRex.ducking) {
        instance.tRex.setDuck(true);
    }

    if (instance.crashed) {
      console.log("Game Over");
      return;
    }

    if (obstacles.length > 0) {
      obstacle_type = obstacles[0]["typeConfig"]["type"]

        const multiplier = instance.currentSpeed + instance.distanceMeter.digits.reduce((a, b) => a + b) / 100 + obstacles[0].width
        const proximity = 100 + multiplier
        const endProximity = 54 - multiplier / 2
        const obsArea = obstacles[0].xPos

      if (obsArea <= proximity && !instance.tRex.jumping && !instance.tRex.ducking) {
        console.log(obstacle_type, proximity, endProximity);

        if (obstacle_type == "PTERODACTYL" && obstacles[0].yPos == 75 || obstacles[0].yPos == 50) {
            instance.tRex.setDuck(true);
        } else {
            instance.tRex.startJump(instance.currentSpeed);
        }
      } else if (obsArea <= endProximity) {
          instance.tRex.setSpeedDrop()
      }
    }
    autoplay();
    // setting the timer for 20 mili seconds
  }, 20);
}
