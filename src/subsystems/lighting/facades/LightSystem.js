import Light from "../entities/Light.js";
import LightController from "../services/LightController.js";
import RoomLightManager from "../services/RoomLightManager.js";
import SceneManager from "../services/SceneManager.js";

class LightSystem {
  constructor() {
    this.lightController = new LightController();
    this.roomLightManager = new RoomLightManager(this.lightController);
    this.sceneManager = new SceneManager(this.lightController);

    console.log("Light system initialized");
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
      return light.setBrightnessLevel(brightness);
    }
    console.log(`Light ${lightId} not found`);
    return false;
  }

  setLightColor(lightId, color) {
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

  createScene(sceneName, lightSetting) {
    if (!sceneName || !lightSetting || typeof lightSetting !== "object") {
      console.log("Invalid scene data");
      return false;
    }
    this.sceneManager.createScene(sceneName, lightSetting);
    return true;
  }

  activateScene(sceneName) {
    return this.sceneManager.activateScene(sceneName);
  }

  getLightStatus(lightId) {
    const light = this.lightController.getLight(lightId);
    if (!light) {
      console.log(`getLightstatus(): Light ${lightId} not found`);
      return null;
    }
    return {
      id: lightId,
      room: light.room,
      isOn: light.isOn,
      brightness: light.brightness,
      color: light.color,
      isDimmable: light.isDimmable,
    };
  }

  getRoomStatus(room) {
    return this.roomLightManager.getRoomStatus(room);
  }
  getAllLightsStatus() {
    return this.lightController
      .getAllLights()
      .map((light) => light.getStatus());
  }
  getAvailableScenes() {
    return this.sceneManager.getScenes();
  }

  turnOffAllLights() {
    this.lightController.getAllLights().forEach((light) => light.turnOff());
    console.log("All lights turned OFF");
  }

  emergencyMode() {
    this.lightController.getAllLights().forEach((light) => {
      light.turnOn();
      light.setBrightnessLevel(100);
      light.setColor("red");
    });
    console.log("Emergency mode activated");
  }
}
export default LightSystem;
