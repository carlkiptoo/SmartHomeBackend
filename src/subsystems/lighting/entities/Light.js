class Light {
  constructor(lightId, room) {
    this.lightId = lightId;
    this.room = room;
    this.isOn = false;
    this.brightness = 0;
    this.color = "white";
    this.isDimmable = false;
  }

  turnOn() {
    this.isOn = true;
    if (this.brightness === 0) {
      this.brightness = 100;
    }

    console.log(`Light ${this.lightId} in ${this.room} turned ON`);
  }

  turnOff() {
    this.isOn = false;
    console.log(`Light ${this.lightId} in ${this.room} turned OFF`);
  }

  setBrightnessLevel(level) {
    if (!this.isDimmable) {
      console.log(`Light ${this.lightId} in ${this.room} is not dimmable`);
      return false;
    }

    if (level >= 0 && level <= 100) {
      this.brightness = level;

      if (level > 0 && !this.isOn) {
        this.isOn = true;
      } else if (level === 0) {
        this.isOn = false;
      }

      console.log(
        `Light ${this.lightId} in ${this.room} brightness set to ${level}`
      );
      return true;
    } else {
      console.log("Brightness level must be between 0 and 100");
      return false;
    }
  }

  setColor(color) {
    if (!color || typeof color !== "string") {
      console.log(`Invalid color: ${color}`);
      return false;
    }
    this.color = color;
    console.log(`Light ${this.lightId} in ${this.room} color set to ${color}`);
    return true;
  }

  getStatus() {
    return {
      id: this.lightId,
      room: this.room,
      isOn: this.isOn,
      brightness: this.brightness,
      color: this.color,
      isDimmable: this.isDimmable,
    };
  }
}

export default Light;
