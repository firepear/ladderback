// tagger widget
//
//

import { Completer } from './completer.js';

class Tagger {
    constructor({id, parent, size=20, tags=[]}) {
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
        this.container.className = 'lbTagger';

        // build the elements we need. first, a completer
        this.complete = new Completer({id: `${id}-completer`, parent: this.container,
                                       size: size, history: tags});
        // then a button
        this.plus = document.createElement("button");
        this.plus.append("+");
        this.plus.className = 'lbTagAdd';
        this.plus.addEventListener("click", this.createTag.bind(this));
        // and a div to hold the selected tags
        this.tagbox = document.createElement("div");
        this.tagbox.className = 'lbTagBox';

        this.container.appendChild(this.complete.elem);
        this.container.appendChild(this.plus);
        this.container.appendChild(this.tagbox);
        parent.appendChild(this.container);

        this.tags = [] // 
    }

    createTag() {
        l.log(`${this.id}: button clicked; creating tag`);
        let value = this.complete.getData()
        // check we already have this one
        if (this.getData().includes(value)) {
            l.log(`${this.id}: tag '${value}' already exists; not adding`);
            return;
        }
        // build the tag
        let tag = document.createElement("span");
        tag.id = `${this.id}-tag-${value}`;
        tag.append(value, " ");
        tag.className = "lbTagTag";
        let closer = document.createElement("span");
        closer.append("ⓧ");
        closer.className = "lbTagDel";
        closer.style.cursor = "pointer";
        closer.addEventListener("click",
                                function() { this.destroyTag(tag.id); }.bind(this));
        tag.append(closer);
        this.tagbox.appendChild(tag);
        this.tags.push(tag);
    }

    destroyTag(tagId) {
        l.log(`${this.id}: destroyTag with id ${tagId}`);
        for (let i in this.tags) {
            if (this.tags[i].id == tagId) {
                this.tagbox.removeChild(this.tags[i]);
                this.tags.splice(i, 1);
            }
        }
    }

    getData() {
        return this.tags.map(x => x.firstChild.textContent);
    }
}

export { Tagger };

