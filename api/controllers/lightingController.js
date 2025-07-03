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

    setBrightnessLevel: (req, res) =>{
        const {lightId} = req.params;
        const {brightness} = req.body;
        const success = lightSystem.setBrightnessLevel(lightId, brightness);
        success
            ?res.status(200).json({message: 'Brightness level set'})
            :res.status(404).json({error: 'Brightness level not set'});
    },

    setColor: (req, res) => {
        const {lightId} = req.params;
        const {color} = req.body;
        const success = lightSystem.setColor(lightId, color);
        success
            ?res.status(200).json({message: 'Color set'})
            :res.status(404).json({error: 'Color not set'});
    },

    

    


}