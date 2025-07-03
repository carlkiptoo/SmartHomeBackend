import mongoose from 'mongoose';

const lightSchema = new mongoose.Schema({
    lightId: {
        type: String,
        required: true,
        unique: true
    },
    room: {
        type: String,
        required: true
    },
    isOn: {
        type: Boolean,
        default: false
    },
    brightness: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    color: {
        type: String,
        default: 'white'

    },
    isDimmable: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const LightModel = mongoose.model('Light', lightSchema);

export default LightModel;