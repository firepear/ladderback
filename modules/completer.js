// completion widget
//
// doesn't work like most autosuggest implementations on the
// web. works like a (restricted) version of the readline library's
// tab completion, operating on history in a most-recent-matches-first
// manner

import { debounce } from './debounce.js';

class Completer {
    constructor({id, size = 35, history = [], histsize = 100, interval = 500}) {
        this.l = window.ladderback;
        this.id = id;
        this.elem = document.createElement("input");
        this.elem.id = id;
        this.elem.name = id;
        this.elem.size = size;

        this.history = this.loadHistory(history);
        this.histsize = histsize;
        this.interval = interval;

        this.loop = false;
        this.timeout = null;   // timeout id from window.setTimeout
        this.partial = "";     // string user is completing on
        this.oldpartial = "";  // partial before searches are run (needed for C-r)
        this.histidx = -1;     // position in history (needed for C-r)

        this.elem.addEventListener("keydown", debounce.bind(this));
        this.elem.addEventListener("blur", this.cleanup.bind(this));
    }

    loadHistory(history) {
        l.i.log(`${this.id}: loading history`);
        let histlist = [];
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

        // look through history
        l.i.log(`${this.id}: searching: ${this.partial}, loop ${this.loop}`);
        for (var i = this.histidx + 1; i < this.history.length; i++) {
            // we handle histidx manually, which is why i is set one
            // ahead in the `for`
            this.histidx++;

            let entry = this.history[i];
            if (entry.startsWith(this.partial)) {
                // found a match. set the input box to the match
                this.elem.value = entry;
                // and move the cursor to the end of it
                this.elem.setSelectionRange(entry.length, entry.length);
                l.i.log(`${this.id}: match: ${entry}`);
                break;
            }
            if (this.loop == true && this.histidx == this.history.length - 1) {
                // if loop is on and we're at the end of the history
                // list, reset i and histidx to start over. this lets
                // the user C-r infinitely, as expected from bash
                l.i.log(`${this.id}: reverse search is looping`);
                this.histidx = -1;
                i = -1;
            }
        }
    }

    cleanup() {
        l.i.log(`${this.id}: cleanup`);
        window.clearTimeout(this.timeout);
        if (this.elem.value != "") {
            if (this.history.length > 0) {
                if (this.elem.value != this.history[0]) {
                    // if current value is not the most recent history item, add it to history
                    this.history.unshift(this.elem.value);
                    l.i.log(`${this.id}: added ${this.elem.value} to history; len ${this.history.length}`);
                } else {
                    l.i.log(`${this.id}: not adding ${this.elem.value} to history; matches last entry`);
                }
            } else {
                // no history, just add the current value
                this.history.unshift(this.elem.value);
                l.i.log(`${this.id}: added ${this.elem.value} to history; len ${this.history.length}`);
            }
        }
        // reset histidx and loop
        this.histidx = -1;
        this.loop = false;
        // pop last history value if we're over histsize
        if (this.history.length > this.histsize) {
            this.history.pop();
            l.i.log(`${this.id}: over histlen, popping`);
        }
    }

    getValue() {
        return this.elem.value;
    }

    // end of class
}

export { Completer };
