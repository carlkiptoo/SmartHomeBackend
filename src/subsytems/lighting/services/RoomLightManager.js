class RoomLightManager {
    constructor(lightController) {
        this.lightController = lightController;
    }

    turnOnRoom(room) {
        const roomLights = this.lightController.getLightsByRoom(room);
        roomLights.forEach(light => light.turnOn());
        console.log(`Lights in ${room} turned ON`);
    }

    turnOffRoom(room) {
        const roomLights = this.lightController.getLightsByRoom(room);
        roomLights.forEach(light => light.turnOff());
        console.log(`Lights in ${room} turned OFF`);
    }
}