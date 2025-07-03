import express from 'express';
import {lightingController} from '../controllers/lightingController.js';

const router = express.Router();

//Light level
router.post('/light', lightingController.addLight);
router.delete('/light/:lightId', lightingController.removeLight);
router.put('/light/:lightId/on', lightingController.turnOnLight);
router.put('/light/:lightId/off', lightingController.turnOffLight);
router.put('/light/:lightId/brightness', lightingController.setLightBrightnessLevel);
router.put('/light/:lightId/color', lightingController.setLightColor);
router.get('/light/:lightId', lightingController.getLightStatus);

//Room level
router.put('/room/:room/on', lightingController.turnOnRoom);
router.put('/room/:room/off', lightingController.turnOffRoom);
router.put('/room/:room/brightness', lightingController.setRoomBrightnessLevel);
router.put('/room/:room/color', lightingController.setRoomColor);
router.get('/room/:room', lightingController.getRoomStatus);

//Scene level
router.post('/scene', lightingController.createScene);
router.put('/scene/:sceneName/activate', lightingController.activateScene);
router.get('/scenes', lightingController.getAvailableScenes);

//System level
router.put('/system/turnoffall', lightingController.turnOffAllLights);
router.put('/system/emergencymode', lightingController.emergencyMode);
router.get('/system/lights', lightingController.getAllLightsStatus);

export default router;