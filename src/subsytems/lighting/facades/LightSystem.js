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
}