class LightSystem {
    constructor() {
        this.lightController = new LightController();
        this.roomLightManager = new RoomLightManager(this.lightController);
        this.sceneManager = new SceneManager(this.lightController);

        console.log('Light system initialized');
    }

    addLight(lightId, room, isDimmable = true) {
        return this.lightController.addLight(lightId, room, isDimmable);
    }

    removeLight(lightId) {
        return this.lightController.removeLight(lightId);
    }

    turnOnLight(lightId) {
        const light = this.lightController.getLight(lightId);
        if (light) {
            light.turnOn();
            return true;
        }
        console.log(`Light ${lightId} not found`);
        return false;
    }

    turnOffLight(lightId) {
        const light = this.lightController.getLight(lightId);
        if (light) {
            light.turnOff();
            return true;
        }
        console.log(`Light ${lightId} not found`);
        return false;
    }

    setLightBrightnessLevel(lightId, brightness) {
        const light = this.lightController.getLight(lightId);
        if (light) {
            return light.setLightBrightnessLevel(brightness);
        }
        console.log(`Light ${lightId} not found`);
        return false;
    }

    setLightColor(lightId, color){
        const light = this.lightController.getLight(lightId);
        if (light) {
            return light.setColor(color);
        }
        console.log(`Light ${lightId} not found`);
        return false;
    }

    //Room controls

    turnOnRoom(room) {
        this.roomLightManager.turnOnRoom(room);
    }
    turnOffRoom(room) {
        this.roomLightManager.turnOffRoom(room);
    }

    setRoomBrightnessLevel(room, brightness) {
        this.roomLightManager.setRoomBrightnessLevel(room, brightness);
    }

    setRoomColor(room, color) {
        this.roomLightManager.setRoomColor(room, color);
    }


}
