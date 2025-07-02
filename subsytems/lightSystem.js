class Light {
    constructor(lightId, room) {
        this.lightId = lightId;
        this.room = room;
        this.isOn = false;
        this.brightness = 0;
        this.color = "white";
        this.isDimmable = false;
    }

    turnOn(){
        this.isOn = true;
        if (this.brightness === 0) {
            this.brightness = 100;
        }

        console.log(`Light ${this.lightId} in ${this.room} turned ON`);
    }

    turnOff(){
        this.isOn = false;
        console.log(`Light ${this.lightId} in ${this.room} turned OFF`);
    }
}