// completion widget
//
// doesn't work like most autosuggest implementations on the
// web. works like a (restricted) version of the readline library's
// tab completion, operating on history in a most-recent-matches-first
// manner

import { debounce } from './debounce.js';

class Completer {
    constructor({id, parent, size = 35, history = [], histsize = 100, interval = 500}) {
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

        // create out input node and set parameters on it
        this.elem = document.createElement("input");
        this.elem.id = id;
        this.elem.name = id;
        this.elem.size = size;
        this.elem.className = "lbCompleter";
        // then append to our parent element
        parent.appendChild(this.elem);
        // set remaining constructor params
        this.history = this.loadHistory(history);
        this.histsize = histsize;
        this.interval = interval;

        // setup variables which don't come directly from the constructor call
        this.loop = false;     // are we in "loop mode" (C-r being invoked)?
        this.timeout = null;   // timeout id from window.setTimeout
        this.partial = "";     // string user is completing on
        this.oldpartial = "";  // partial before searches are run (needed for C-r)
        this.histidx = -1;     // position in history (needed for C-r)
        this.lastmatch = ""

        // finally, set the debounce trigger (which is our event loop driver)
        this.elem.addEventListener("keydown", debounce.bind(this));
        // and a call to cleanup on blur
        this.elem.addEventListener("blur", this.cleanup.bind(this));
    }

    loadHistory(history) {
        let histlist = [];
        if (history.length > 0) { l.log(`${this.id}: loading history`) };
        for (const item of history) {
            if (typeof(item) != "string") {
                throw `history item ${item} (${typeof(item)}) is not a string`;
            }
            histlist.unshift(item);
        }
        return histlist;
    }

    search() {
        // we end up here because the user has typed something and our debounce
        // timer has expired. first order of business is to set the timeout var
        // back to null
        this.timeout = null;
        // do nothing if input has been cleared
        if (this.elem.value == "") {
            return;
        }
        // set partial to current input value unless loop mode is
        // active (loop is set in debounce.js). in loop mode (backward
        // searches) we want to keep the partial value set to what the
        // user initially typed, so that we keep searching for that
        if (this.loop == false) {
            this.partial = this.elem.value;
            this.oldpartial = this.elem.value;
        }

        // look through history. this loop is horribly finicky, and
        // one day i'll figure out how to drive it in a more sane
        // fashion
        l.log(`${this.id}: searching: ${this.partial}, loop ${this.loop}`);
        for (var i = this.histidx + 1; i <= this.history.length; i++) {
            // we handle histidx manually, which is why i is set one
            // ahead in the `for`
            this.histidx++;

            let entry = this.history[i];
            // `undefined` has to be guarded against because looping
            // can let i walk off the array by one. catching that here
            // lets us fall to the loop reset below
            if (entry != undefined && entry.startsWith(this.partial)) {
                // found a possible match. check against the previous
                // match and do nothing if they're the same
                if (entry != this.lastmatch) {
                    // set the input box to the match
                    this.elem.value = entry;
                    // and move the cursor to the end of it
                    this.elem.setSelectionRange(entry.length, entry.length);
                    // update lastmatch
                    this.lastmatch = entry;
                    l.log(`${this.id}: match: ${entry}`);
                    break;
                }
            }
            if (this.loop == true && this.histidx >= this.history.length - 1) {
                // if loop is on and we're at the end of the history
                // list, reset i and histidx to start over. this lets
                // the user C-r infinitely, as expected from bash
                l.log(`${this.id}: reverse search is looping`);
                this.histidx = -1;
                i = -1;
            }
        }
    }

    cleanup() {
        l.log(`${this.id}: cleanup`);
        window.clearTimeout(this.timeout);
        if (this.elem.value != "") {
            if (this.history.length > 0) {
                if (this.elem.value != this.history[0]) {
                    // if current value is not the most recent history item, add it to history
                    this.history.unshift(this.elem.value);
                    l.log(`${this.id}: added ${this.elem.value} to history; len ${this.history.length}`);
                } else {
                    l.log(`${this.id}: not adding ${this.elem.value} to history; matches last entry`);
                }
            } else {
                // no history, just add the current value
                this.history.unshift(this.elem.value);
                l.log(`${this.id}: added ${this.elem.value} to history; len ${this.history.length}`);
            }
        }
        // reset everything
        this.histidx = -1;
        this.partial = this.elem.value;
        this.oldpartial = this.elem.value;
        this.loop = false;
        // pop last history value if we're over histsize
        if (this.history.length > this.histsize) {
            this.history.pop();
            l.log(`${this.id}: over histlen, popping`);
        }
    }

    getData() {
        return this.elem.value;
    }

    // end of class
}

export { Completer };
