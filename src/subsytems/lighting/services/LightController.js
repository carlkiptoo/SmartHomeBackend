class LightController {
    constructor() {
        this.lights = new Map();
    }

    addLight(lightId, room, isDimmable = true) {
        const light = new Light(lightId, room);
        light.isDimmable = isDimmable;
        this.lights.set(lightId, light);
        console.log(`Light ${lightId} in ${room} added`);
        return light;
    }
}