// completion widget
//
// doesn't work like most autosuggest implementations on the
// web. works like a (restricted) version of the readline library's
// tab completion, operating on history in a most-recent-matches-first
// manner

import { debounce } from './debounce.js';

class Completer {
    constructor({id, size = 35, history = [], histsize = 100, interval = 500}) {
        this.elem = document.createElement("input")
        this.elem.id = id;
        this.elem.name = id;
        this.elem.size = size;

        this.history = history;
        this.histsize = histsize;
        this.interval = interval;

        this.loop = false;
        this.timeout = null;     // timeout id from window.setTimeout
        this.partial = "";        // string user is completing on
        this.oldpartial = "";
        this.oldidx = 0;
        this.histidx = -1;        // position in history (needed for C-r)

        this.elem.addEventListener("keydown", debounce.bind(this));
        this.elem.addEventListener("blur", this.cleanup.bind(this));
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
        // set partial to current input value unless loop mode is active
        if (this.loop == false) {
            this.partial = this.elem.value;
            this.oldpartial = this.elem.value;
        }

        // look through history
        for (var i = this.histidx + 1; i < this.history.length; i++) {
            this.histidx++;
            this.oldidx = this.histidx;

            let entry = this.history[i];
            if (entry.startsWith(this.partial)) {
                this.elem.value = entry;
                this.elem.setSelectionRange(entry.length, entry.length);
                break;
            }
            if (this.loop == true && this.histidx == this.history.length - 1) {
                this.histidx = -1;
                i = -1;
            }
        }
    }

    cleanup() {
        window.clearTimeout(this.timeout);
        if (this.elem.value != "") {
            if (this.history.length > 0) {
                if (this.elem.value != this.history[0]) {
                    // if current value is not the most recent history item, add it to history
                    this.history.unshift(this.elem.value);
                }
            } else {
                // no history, just add the current value
                this.history.unshift(this.elem.value);
            }
        }
        // reset histidx and loop
        this.histidx = -1;
        this.loop = false;
        // pop last history value if we're over histsize
        if (this.history.length > this.histsize) {
            this.history.pop();
        }
    }

    getValue() {
        return this.elem.value;
    }

    // end of class
}

export { Completer };
