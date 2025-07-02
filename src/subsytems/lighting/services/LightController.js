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

    removeLight(lightId) {
        if (this.lights.has(lightId)) {
            this.lights.delete(lightId);
            console.log(`Light ${lightId} removed`);
            return true;
        }
        return false;
    }

    getLight(lightId) {
        return this.lights.get(lightId);
    }

    getAllLights() {
        return Array.from(this.lights.values());
    }

    getLightsByRoom(room) {
        return this.getAllLights().filter(light => light.room === room);
    }
}