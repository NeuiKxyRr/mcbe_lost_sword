import {
    lostUtil
}
from "./lost_util.js";
import {
    Debug
}
from "./Debug.js";
import {
    world, system
}
from "@minecraft/server";

let Config;

function description(defineProperty, bindObject, bindProperty) {
    return {
        enumerable: true,
        configurable: false,
        set: function(parm) {
            Debug.gameDebug(defineProperty + " set " + parm);
            this["_" + defineProperty] = parm;
        },
        get: function() {
            let _prop;
            if (typeof bindObject === "function") {
                _prop = bindObject()[bindProperty];
            } else {
                _prop = bindObject[bindProperty];
            }
            if (this["_" + defineProperty] === undefined && _prop === undefined) {
                this["_" + defineProperty] = _prop;
                return _prop;
            }
            return this["_" + defineProperty];
        }
    }
}

(function(data) => {
    data["addon_id"] = "lost_sword";
    data["version"] = "1.3.1";
    data["author"] = "neuikxyrr";
    data["mc_version"] = "1.21.70";
    data["address"] = "";
    data["application_is_hook"] = false;
    data["level_player_name"] = "";
    data["level_player_id"] = "";
    system.run(() => {
        Object.defineProperties(Config, {
            "level_player_name": description("level_player_name", lostUtil.getPlayer, "nameTag"),
            "level_player_uid": description("level_player_uid", lostUtil.getPlayer, "id")
        })
    })
})(Config || (Config = {}));

export {
    Config
};