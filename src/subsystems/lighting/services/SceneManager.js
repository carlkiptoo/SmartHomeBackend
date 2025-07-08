
class SceneManager {
    constructor(lightController) {
        this.lightController = lightController;
        this.scenes = new Map();
    }

    // async createScene(sceneName, lightSetting) {
    //     try {
    //     const settingsArray = Object.entries(lightSetting).map(([lightId, setting]) => ({
    //         lightId,
    //         ...setting
    //     }));
    //     this.scenes.set(sceneName.toLowerCase(), settingsArray);
    //     console.log(`Scene ${sceneName} created`)

    //     const newScene = new SceneModel({
    //         sceneName: sceneName.toLowerCase(),
    //         lightSetting: settingsArray
    //     })

    //     await newScene.save();
    //     console.log(`Scene ${sceneName} saved to DB`);
    // } catch (err) {
    //     console.error(`Error creating scene ${sceneName}`, err);
    // }
    // }

    async createScene(sceneName, lightSetting) {
    try {
        const { default: SceneModel } = await import(resolvePath(import.meta.url, '../../../../../api/models/SceneModel.js'));

        const settingsArray = Object.entries(lightSetting).map(([lightId, setting]) => ({
            lightId,
            ...setting
        }));
        this.scenes.set(sceneName.toLowerCase(), settingsArray);
        console.log(`Scene ${sceneName} created`);

        const newScene = new SceneModel({
            sceneName: sceneName.toLowerCase(),
            lightSetting: settingsArray
        });

        await newScene.save();
        console.log(`Scene ${sceneName} saved to DB`);
    } catch (err) {
        console.error(`Error creating scene ${sceneName}`, err);
    }
}


    // async activateScene(sceneName) {
    //     const normalizedName = this.scenes.get(sceneName.toLowerCase());
    //     let scene = this.scenes.get(normalizedName);

    //     if (!scene) {
    //         console.log(`Scene ${sceneName} not found in memory. Looking in Db`);
    //         const sceneFromDB = await sceneModel.findOne({sceneName: normalizedName});

    //         if (!sceneFromDB) {
    //             console.log(`Scene ${sceneName} not found in DB`);
    //             return false;
    //         }
    //         scene = sceneFromDB.lightSettings;
    //         this.scenes.set(normalizedName, scene);
    //         console.log(`Scene ${sceneName} loaded from DB and cached`);
    //     }

    //     scene.forEach(setting => {
    //         const light = this.lightController.getLight(setting.lightId);
    //         if  (light) {
    //             if (setting.isOn) {
    //                 light.turnOn();
    //                 if (setting.brightness !== undefined) {
    //                     light.setBrightnessLevel(setting.brightness);
    //                 }
    //                 if (setting.color) {
    //                     light.setColor(setting.color);
    //                 }
    //             } else {
    //                 light.turnOff();
    //             }
    //         }
    //     })
    //     console.log(`Scene ${sceneName} activated`);
    //     return true;
    // }

    async activateScene(sceneName) {
    try {
        const normalizedName = sceneName.toLowerCase();
        let scene = this.scenes.get(normalizedName);

        if (!scene) {
            console.log(`Scene ${sceneName} not found in memory. Looking in DB`);
            const { default: SceneModel } = await import(resolvePath(import.meta.url, '../../../../../api/models/SceneModel.js'));
            const sceneFromDB = await SceneModel.findOne({ sceneName: normalizedName });

            if (!sceneFromDB) {
                console.log(`Scene ${sceneName} not found in DB`);
                return false;
            }

            scene = sceneFromDB.lightSetting;
            this.scenes.set(normalizedName, scene);
            console.log(`Scene ${sceneName} loaded from DB and cached`);
        }

        scene.forEach(setting => {
            const light = this.lightController.getLight(setting.lightId);
            if (light) {
                if (setting.isOn) {
                    light.turnOn();
                    if (setting.brightness !== undefined) light.setBrightnessLevel(setting.brightness);
                    if (setting.color) light.setColor(setting.color);
                } else {
                    light.turnOff();
                }
            }
        });

        console.log(`Scene ${sceneName} activated`);
        return true;
    } catch (err) {
        console.error(`Error activating scene ${sceneName}`, err);
        return false;
    }
}


    getScenes() {
        return Array.from(this.scenes.keys());
    }


}

export default SceneManager;