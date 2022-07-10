// tagger widget
//
//

import { debounce } from './debounce.js';

class Tagger {
    constructor({id, label}) {
        this.id = id;
        this.container = document.createElement("div")
        this.container.className = 'ladderbackTagger';
        this.complete = new l.completer({id: `${id}-completer`});
        this.tagbox = document.createElement("div");
        this.container.addChild(this.complete.elem);
        this.container.addChild(this.tagbox);
    }
}

class TagButton {
    constructor() {
    }
}

export { Tagger };

