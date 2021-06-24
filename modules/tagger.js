// tagger widget
//
//

import { debounce } from './debounce.js';

class Tagger {
    constructor({id, size = 35, tags = [], interval = 500}) {
        this.elem = document.createElement("input")
        this.elem.id = id;
        this.elem.name = id;
        this.elem.size = size;

        this.tags = history;
        this.interval = interval;

        this.timeout = null;     // timeout id from window.setTimeout
        this.partial = "";        // string user is completing on
        this.oldpartial = "";
        this.oldidx = 0;
        this.histidx = -1;        // position in history (needed for C-r)

        this.elem.addEventListener("keydown", debounce.bind(this));
        this.elem.addEventListener("blur", this.cleanup.bind(this));
    }
}

export { Tagger };
