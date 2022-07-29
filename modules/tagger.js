// tagger widget
//
//

import { Completer } from './completer.js';

class Tagger {
    constructor({id, parent, tags=[]}) {
        this.l = window.ladderback;
        this.id = id;
        if (id == undefined || parent == undefined) {
            l.log("Completer: `id` and `parent` parameters must be speficied; bailing");
            throw("Completer: `id` and `parent` parameters must be speficied; bailing");
        }
        if (parent.nodeType == undefined) {
            l.log(`${this.id}: 'parent' must be a valid node; bailing`);
            throw(`${this.id}: 'parent' must be a valid node; bailing`);
        }

        // create the continer div which will hold the infividual
        // widget elements
        this.container = document.createElement("div")
        this.container.className = 'ladderbackTagger';

        // build the elements we need. first, a completer
        this.complete = new Completer({id: `${id}-completer`, parent: this.container,
                                       size: '20', history: tags});
        // then a button
        this.plus = document.createElement("button");
        this.plus.append("+");
        this.plus.className = 'ladderbackTagger';
        this.plus.addEventListener("click", this.createTag.bind(this));
        // and a div to hold the selected tags
        this.tagbox = document.createElement("div");
        this.tagbox.className = 'ladderbackTagger';

        this.container.appendChild(this.complete.elem);
        this.container.appendChild(this.plus);
        this.container.appendChild(this.tagbox);
        parent.appendChild(this.container);

        this.tags = [] // 
    }

    createTag() {
        l.log(`${this.id}: button clicked; creating tag`);
        let value = this.complete.getData()
        l.log(`${this.id}: got completer value ${value}`);
        //
        let tag = document.createElement("span");
        tag.id = `${this.id}-tag-${value}`;
        tag.append(value);
        let closer = document.createElement("span");
        closer.append("ⓧ");
        closer.addEventListener("click",
                                function() { this.destroyTag(tag.id); }.bind(this));
        closer.style.marginRight = "0.5rem";
        tag.append(closer);
        this.tagbox.appendChild(tag);
        this.tags.push(tag);
    }

    destroyTag(tagId) {
        l.log(`${this.id}: destroyTag with id ${tagId}`);
    }
}

export { Tagger };

