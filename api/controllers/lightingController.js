import LightSystem from "../../src/subsystems/lighting/facades/LightSystem.js";
import LightModel from "../models/LightModel.js";

const lightSystem = new LightSystem();

export const initializeLightsFromDB = async() => {
    const lights = await LightModel.find({});
    lights.forEach(lightDoc => {
        const light = lightSystem.addLight(
            lightDoc.lightId,
            lightDoc.room,
            lightDoc.isDimmable
        );

        if (lightDoc.isOn) {
            light.turnOn();
        }
        if (lightDoc.brightness > 0) light.setBrightnessLevel(lightDoc.brightness);
        if (lightDoc.color) light.setColor(lightDoc.color);
    });
    console.log('Lights initialized from DB');
}

export const lightingController = {
  addLight: async (req, res) => {
    const { lightId, room, isDimmable = true } = req.body;

    try {
      const light = lightSystem.addLight(lightId, room, isDimmable);
      if (!light) {
        return res
          .status(400)
          .json({ success: false, message: "Light already exists" });
      }

      const newLight = new LightModel({
        lightId,
        room,
        isOn: light.isOn,
        brightness: light.brightness,
        color: light.color,
        isDimmable: light.isDimmable,
      });

      await newLight.save();

      return res
        .status(201)
        .json({ success: true, message: "Light added", data: newLight });
    } catch (error) {
      console.error("Error adding light:", error);

      return res
        .status(500)
        .json({
          success: false,
          message: "Failed to add light",
          error: error.message,
        });
    }
  },

  removeLight: (req, res) => {
    const { lightId } = req.params;
    const success = lightSystem.removeLight(lightId);
    success
      ? res.status(200).json({ message: "Light removed" })
      : res.status(404).json({ error: "Light not found" });
  },

  turnOnLight: async(req, res) => {
    const { lightId } = req.params;
    const success = lightSystem.turnOnLight(lightId);
    if (success) {
        await LightModel.updateOne({lightId}, {$set: {isOn: true}});
      res.status(200).json({ message: "Light turned on" });
    } else {
      res.status(404).json({ error: "Light not turned on" });
    }
  },

  turnOffLight: async (req, res) => {
    const { lightId } = req.params;
    const success = lightSystem.turnOffLight(lightId);
    if (success) {
        await LightModel.updateOne({lightId}, {$set: {isOn: false}});
        res.status(200).json({ message: "Light turned off" });
    } else {
        res.status(404).json({ error: "Light not turned off" });
    }
  },

  setLightBrightnessLevel: async (req, res) => {
    const { lightId } = req.params;
    const { brightness } = req.body;
    const success = lightSystem.setLightBrightnessLevel(lightId, brightness);
    if (success) {
        await LightModel.updateOne({lightId}, {$set: {brightness}});
        res.status(200).json({ message: "Brightness level set" });
    } else {
        res.status(404).json({ error: "Brightness level not set" });
    }
  },

  setLightColor: async (req, res) => {
    const { lightId } = req.params;
    const { color } = req.body;
    const success = lightSystem.setLightColor(lightId, color);
    if (success) {
        await LightModel.updateOne({lightId}, {$set: {color}});
        res.status(200).json({ message: "Color set" });
    } else {
        res.status(404).json({ error: "Color not set" });
    }
  },

  getLightStatus: (req, res) => {
    const { lightId } = req.params;
    const status = lightSystem.getLightStatus(lightId);
    status
      ? res.status(200).json({ message: "Light status", status })
      : res.status(404).json({ error: "Light not found" });
  },

  turnOnRoom: async(req, res) => {
    const { room } = req.params;
    lightSystem.turnOnRoom(room);
    await LightModel.updateMany({room}, {$set: {isOn: true}});
    res.json({ message: `Room ${room} turned on` });
  },

  turnOffRoom: async(req, res) => {
    const { room } = req.params;
    lightSystem.turnOffRoom(room);
    await LightModel.updateMany({room}, {$set: {isOn: false}});
    res.json({ message: `Room ${room} turned off` });
  },

  setRoomBrightnessLevel: async(req, res) => {
    const { room } = req.params;
    const { brightness } = req.body;
    await LightModel.updateMany({room}, {$set: {brightness}});
    lightSystem.setRoomBrightnessLevel(room, brightness);
    res.json({ message: `Room ${room} brightness set to ${brightness}` });
  },

  setRoomColor: async (req, res) => {
    const { room } = req.params;
    const { color } = req.body;
    await LightModel.updateMany({room}, {$set: {color}});
    lightSystem.setRoomColor(room, color);
    res.json({ message: `Room ${room} color set to ${color}` });
  },

  getRoomStatus: (req, res) => {
    const { room } = req.params;
    const status = lightSystem.getRoomStatus(room);
    res.json({ message: "Room status", status });
  },

  createScene: async (req, res) => {
    const { sceneName, lightSetting } = req.body;

    if (!sceneName || !lightSetting || typeof lightSetting !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid sceneName or lightSetting",
      });
    }

    try {
      lightSystem.createScene(sceneName, lightSetting);
      await LightModel.updateMany({sceneName}, {$set: {sceneName}});
      res.status(201).json({
        success: true,
        message: `Scene ${sceneName} created successfully`,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "Error creating scene",
      });
    }
  },

  activateScene: async(req, res) => {
    const { sceneName } = req.params;
    const result = lightSystem.activateScene(sceneName);
    if (result) {
        await LightModel.updateMany({sceneName}, {$set: {sceneName}});
        res.status(200).json({ message: "Scene activated" });
    } else {
        res.status(404).json({ error: `Scene ${sceneName} not found` });
    }
  },

  getAvailableScenes: (req, res) => {
    res.json({
      message: "Available scenes",
      scenes: lightSystem.getAvailableScenes(),
    });
  },

  turnOffAllLights: async (req, res) => {
    await LightModel.updateMany({}, {$set: {isOn: false}});
    lightSystem.turnOffAllLights();
    res.json({ message: "All lights turned off" });
  },
  emergencyMode: async (req, res) => {
    await LightModel.updateMany({}, {$set: {isOn: true, brightness: 100, color: 'red'}});
    lightSystem.emergencyMode();
    res.json({ message: "Emergency mode activated" });
  },

  getAllLightsStatus: (req, res) => {
    const status = lightSystem.getAllLightsStatus();
    res.json({ message: "All lights status", status });
  },
};

export default lightSystem;
