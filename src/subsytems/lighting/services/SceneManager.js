class SceneManager {
    constructor(lightController) {
        this.lightController = lightController;
        this.scenes = new Map();
    }

    createScene(sceneName, lightSetting) {
        this.scenes.set(sceneName, lightSetting);
        console.log(`Scene ${sceneName} created`);
    }

    activateScene(sceneName) {
        const scene = this.scenes.get(sceneName);
        if (!scene) {
            console.log(`Scene ${sceneName} not found`);
            return false;
        }

        scene.forEach(setting => {
            const light = rhis.lightController.getLight(setting.lightId);
            if  (light) {
                if (setting.isOn) {
                    light.turnOn();
                    if (setting.brightness !== undefined) {
                        light.setBrightnessLevel(setting.brightness);
                    }
                    if (setting.color) {
                        light.setColor(setting.color);
                    }
                } else {
                    light.turnOff();
                }
            }
        })
        console.log(`Scene ${sceneName} activated`);
        return true;
    }

    getScene() {
        return Array.from(this.scenes.keys());
    }


}