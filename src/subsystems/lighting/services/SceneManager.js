class SceneManager {
    constructor(lightController) {
        this.lightController = lightController;
        this.scenes = new Map();
    }

    createScene(sceneName, lightSetting) {
        const settingsArray = Object.entries(lightSetting).map(([lightId, setting]) => ({
            lightId,
            ...setting
        }));
        this.scenes.set(sceneName.toLowerCase(), settingsArray);
        console.log(`Scene ${sceneName} created`)
    }

    activateScene(sceneName) {
        const scene = this.scenes.get(sceneName.toLowerCase());
        if (!scene) {
            console.log(`Scene ${sceneName} not found`);
            return false;
        }

        scene.forEach(setting => {
            const light = this.lightController.getLight(setting.lightId);
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

    getScenes() {
        return Array.from(this.scenes.keys());
    }


}

export default SceneManager;