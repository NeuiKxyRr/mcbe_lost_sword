import {
    system, world
}
from "@minecraft/server";
import {
    Config
}
from "../config.js";
import {
    lostUtil
}
from "../lost_util.js";

class LevelSaver {
    constructor(worldIn) {
        this.world = worldIn;
        this.properties = new Map();
        this.init(); //初始化
    }

    init() {
        this.registerProperty("level_player_name", "string");
        this.registerProperty("level_player_uid", "number");
        system.run(() => {
            for (let v of this.properties.keys()) {
                Config[v] = world.getDynamicProperty(v);
            }
        })
    }

    registerProperty(property, type) {
        if (this.hasProperty(property)) throw "dont register the same property over once";
        this.properties.set(property, type);
    }

    hasProperty(property) {
        return this.properties.has(property);
    }

    unregisterProperty(property) {
        return this.properties.delete(property);
    }

}

export const levelSaver = new LevelSaver(world);