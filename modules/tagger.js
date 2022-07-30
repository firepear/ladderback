// tagger widget
//
//

import { Completer } from './completer.js';

class Tagger {
    constructor({id, parent, size=20, tags=[]}) {
        this.l = window.ladderback;
        this.id = id;
        this.tags = [] // array to hold created tags, later
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
        // and a div to hold the tags
        this.tagbox = document.createElement("div");
        this.tagbox.className = 'lbTagBox';
        // now put then all in teh container
        this.container.appendChild(this.complete.elem);
        this.container.appendChild(this.plus);
        this.container.appendChild(this.tagbox);
        // and put our container in its parent
        parent.appendChild(this.container);
    }

    createTag() {
        l.log(`${this.id}: button clicked; creating tag`);
        // get the current value of our Completer
        let value = this.complete.getData()
        // check we already have this one
        if (this.getData().includes(value)) {
            l.log(`${this.id}: tag '${value}' already exists; not adding`);
            return;
        }
        // no? build the tag
        let tag = document.createElement("span");
        tag.id = `${this.id}-tag-${value}`;
        tag.append(value, " ");
        tag.className = "lbTagTag";
        // set up the cute discard/delete button
        let closer = document.createElement("span");
        closer.append("ⓧ");
        closer.className = "lbTagDel";
        closer.style.cursor = "pointer";
        closer.addEventListener("click",
                                function() { this.destroyTag(tag.id); }.bind(this));
        tag.append(closer);
        // put the tag in the tagbox
        this.tagbox.appendChild(tag);
        // and copy it (as data) into the tag list
        this.tags.push(tag);
    }

    destroyTag(tagId) {
        // when a discard button is clicked, we come here, look
        // through the tag list, and throw away both instances of the
        // one that matches our passed-in id
        l.log(`${this.id}: destroyTag with id ${tagId}`);
        for (let i in this.tags) {
            if (this.tags[i].id == tagId) {
                this.tagbox.removeChild(this.tags[i]);
                this.tags.splice(i, 1);
                return;
            }
        }
    }

    getData() {
        // iterate on the tag list; construct a list from their text
        return this.tags.map(x => x.firstChild.textContent);
    }
}

export { Tagger };

