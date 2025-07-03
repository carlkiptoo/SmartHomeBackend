import LightSystem from '../../src/subsytems/lighting/facades/LightSystem.js';

const lightSystem = new LightSystem();

export const lightingController = {
    addLight: (req, res) =>{
        const {lightId, room, isDimmable} = req.body;

        const result = lightSystem.addLight(lightId, room, isDimmable);
        result
            ?res.status(201).json({message: 'Light added', light: result})
            :res.status(400).json({error: 'Light already exists'});
    }
}