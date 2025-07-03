import LightSystem from '../../src/subsytems/lighting/facades/LightSystem.js';

const lightSystem = new LightSystem();

export const lightingController = {
    addLight: (req, res) =>{
        const {lightId, room, isDimmable} = req.body;

        const result = lightSystem.addLight(lightId, room, isDimmable);
        result
            ?res.status(201).json({message: 'Light added', light: result})
            :res.status(400).json({error: 'Light already exists'});
    },

    removeLight: (req, res) =>{
        const {lightId} = req.params;
        const success = lightSystem.removeLight(lightId);
        success
            ?res.status(200).json({message: 'Light removed'})
            :res.status(404).json({error: 'Light not found'});
    },

    turnOnLight: (req, res) => {
        const {lightId} = req.params;
        const success = lightSystem.turnOnLight(lightId);
        success
            ?res.status(200).json({message: 'Light turned on'})
            :res.status(404).json({error: 'Light not turned on'});
    },

    turnOffLight: (req, res) => {
        const {lightId} = req.params;
        const success = lightSystem.turnOffLight(lightId);
        success
            ?res.status(200).json({message: 'Light turned off'})
            :res.status(404).json({error: 'Light not turned off'});
    },

    setLightBrightnessLevel: (req, res) =>{
        const {lightId} = req.params;
        const {brightness} = req.body;
        const success = lightSystem.setBrightnessLevel(lightId, brightness);
        success
            ?res.status(200).json({message: 'Brightness level set'})
            :res.status(404).json({error: 'Brightness level not set'});
    },

    setLightColor: (req, res) => {
        const {lightId} = req.params;
        const {color} = req.body;
        const success = lightSystem.setColor(lightId, color);
        success
            ?res.status(200).json({message: 'Color set'})
            :res.status(404).json({error: 'Color not set'});
    },

    getLightStatus:(req, res) =>{
        const {lightId} = req.params;
        const status = lightSystem.getLightStatus(lightId);
        status
            ?res.status(200).json({message: 'Light status', status})
            :res.status(404).json({error: 'Light not found'});
    },

    turnOnRoom: (req, res) => {
        const {room} = req.params;
        lightSystem.turnOnRoom(room);
        res.json({message: `Room ${room} turned on`});
    },

    turnOffRoom: (req, res) => {
        const {room} = req.params;
        lightSystem.turnOffRoom(room);
        res.json({message: `Room ${room} turned off`});
    },

    setRoomBrightnessLevel: (req, res) => {
        const {room} = req.params;
        const {brightness} = req.body;
        lightSystem.setRoomBrightnessLevel(room, brightness);
        res.json({message: `Room ${room} brightness set to ${brightness}`});
    },

    setRoomColor: (req, res) => {
        const {room} = req.params;
        const {color} = req.body;
        lightSystem.setRoomColor(room, color);
        res.json({message: `Room ${room} color set to ${color}`});
    },

    getRoomStatus: (req, res) =>{
        const {room} = req.params;
        const status = lightSystem.getRoomStatus(room);
        res.json({message: 'Room status', status});
    },

    createScene: (req, res) =>{
        const {sceneName, settings} = req.body;
        lightSystem.createScene(sceneName, settings);
        res.status(201).json({message: `'Scene created'`});
    },

    activateScene: (req, res) => {
        const {sceneName} = req.params;
        const result = lightSystem.activateScene(sceneName);
        result
            ?res.status(200).json({message: 'Scene activated'})
            :res.status(404).json({error: `Scene ${sceneName} not found`});
    },

    getAvailableScenes: (req, res) => {
        res.json({message: 'Available scenes', scenes: lightSystem.getAvailableScenes()});
    },

    turnOffAllLights: (req, res) => {
        lightSystem.turnOffAllLights();
        res.json({message: 'All lights turned off'});
    },
    emergencyMode: (req, res) => {
        lightSystem.emergencyMode();
        res.json({message: 'Emergency mode activated'});
    }



    


}