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
}