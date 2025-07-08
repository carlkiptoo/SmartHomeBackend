import mongoose from 'mongoose';

const lightSettingSchema = new mongoose.Schema({
    lightId: {type: String, required: true},
    isOn: {type: Boolean, required: true},
    brightness: {type: Number, min: 0, max: 100},
    color: {type: String, default: 'white'},
}, {_id: false});

const sceneSchema = new mongoose.Schema({
    sceneName: {type: String, required: true, unique: true},
    lightSettings: [lightSettingSchema]
}, {timestamps: true});

const SceneModel = mongoose.model('Scene', sceneSchema);

export default SceneModel;