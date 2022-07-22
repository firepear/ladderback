// tagger widget
//
//

import { debounce } from './debounce.js';
import { Completer } from './completer.js';

class Tagger {
    constructor({id, label, width}) {
        this.id = id;

        // create the continer div which will hold the infividual
        // widget elements
        this.container = document.createElement("div")
        this.container.className = 'ladderbackTagger';

        // build the elements we need. first, a completer, to 
        this.complete = new Completer({id: `${id}-completer`, width: '95%'});
        // then a button
        this.plus = document.createElement("button");
        this.tagbox = document.createElement("div");
        this.container.addChild(this.complete.elem);
        this.container.addChild(this.tagbox);
    }
}

class Tag {
    constructor() {
    }
}

export { Tagger };

