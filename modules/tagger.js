// tagger widget
//
//

import { Completer } from './completer.js';

class Tagger {
    constructor({id, parent, tags=[]}) {
        this.id = id;

        // create the continer div which will hold the infividual
        // widget elements
        this.container = document.createElement("div")
        this.container.className = 'ladderbackTagger';

        // build the elements we need. first, a completer
        this.complete = new Completer({id: `${id}-completer`, size: '95%', history: tags});
        // then a button
        this.plus = document.createElement("button");
        // and a div to hold the selected tags
        this.tagbox = document.createElement("div");
        this.container.addChild(this.complete.elem);
        this.container.addChild(this.tagbox);
    }
}

export { Tagger };

