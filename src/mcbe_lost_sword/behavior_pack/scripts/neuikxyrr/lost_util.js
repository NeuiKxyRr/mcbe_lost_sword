import {
    world, system
}
from "@minecraft/server";
import {
    SimulatedPlayer
}
from "@minecraft/server-gametest";

class LostUtil {
    constructor() {}

    getPlayers() {
        return Array.from(world.getAllPlayers()).filter(x => !(x instanceof SimulatedPlayer));
    }

    getPlayer() {
        return Array.from(world.getAllPlayers()).filter(x => !(x instanceof SimulatedPlayer))[0];
    }

    getEntity(uuid) {
        return world.getEntity(uuid);
    }

    getHealth(entity) {
        return entity.getComponent('minecraft:health');
    }

    hasHealth(entity) {
        return entity.hasComponent('minecraft:health');
    }

    getHealth(entity) {
        if (!this.hasHealth(entity)) return undefined;
        return this.getHealth().currentValue;
    }

    isLockHealth(entity) {
        if (!this.hasHealth(entity)) return false;
        return (this.getHealth(entity).effectiveMin > 0);
    }

    playDeadAnimation(entity) {
        if (Math.round() < 0.5) return entity.playAnimation('animation.entity.death.left');
        return entity.playAnimation('animation.entity.death.right');
    }

    hasItem(typeId) {
        if (!entity.hasComponent('minecraft:inventory')) return false;
        for (let i = 0, iv = entity.getComponent('minecraft:inventory').container; i < iv.size; i++) {
            if (iv.getItem(i).typeId === typeId) return true;
        }
        return false;
    }
}

export const lostUtil = new LostUtil();