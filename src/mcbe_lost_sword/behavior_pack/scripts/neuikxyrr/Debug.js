import {
    world, system
}
from "@minecraft/server";

export class Debug {
    static debug(fmt) {
        console.log(fmt);
    }
    static gameDebug(fmt) {
        system.run(() => {
            world.sendMessage(fmt.toString());
        })
    }
}