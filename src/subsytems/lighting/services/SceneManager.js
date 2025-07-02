class SceneManager {
    constructor(lightController) {
        this.lightController = lightController;
        this.scenes = new Map();
    }

    createScene(sceneName, lightSetting) {
        this.scenes.set(sceneName, lightSetting);
        console.log(`Scene ${sceneName} created`);
    }


}