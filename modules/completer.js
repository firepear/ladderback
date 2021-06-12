// completion widget
//
// doesn't work like most autosuggest implementations on the
// web. works like a (restricted) version of the readline library's
// tab completion, operating on history in a most-recent-matches-first
// manner
//
// PLAN
//
// 1. User types something
//
// 2. On debounce, the widget history is checked for the current entered string
//
// 3. Is no match, nothing happens
//
// 4. On match, current input is replaced with the match
//    A. User-entered text in black
//    B. rest of match in gray
//    C. cursor positioned at end of user text with setSelectionRange(len, len)
//
// 5. TAB or ENTER accepts suggestion
//
// 6. Any other keystroke causes the suggestion to be replaced with
//    ONLY the user-entered portion, and typing continuesXS
//
// TODO
//
// C-r to search again in history for the same prefix
// C-c to abandon search?

class Completer {
    constructor({id, size = 35, history = [], histsize = 100, interval = 300}) {
        this.elem = document.createElement("input")
        this.elem.id = id;
        this.elem.name = id;
        this.elem.size = size;

        this.history = history;
        this.histsize = histsize;
        this.interval = interval;
        this.timeout = null;     // timeout id from window.setTimeout
        this.partial = ""        // string user is completing on
        this.histidx = -1        // position in history (needed for C-r)

        this.elem.addEventListener("keydown", this.debounce.bind(this));
    }

    debounce(event) {
        if (event.key == "Enter" || event.key == "Tab") {
            if (this.histidx != -1) {
                // accept completion suggestion
                this.elem.value = this.history[this.histidx];
            }
            if (this.history.length > 0) {
                if (this.elem.value != this.history[0]) {
                    // if current value is not the most recent history item, add it to history
                    this.history.unshift(this.elem.value);
                }
            } else {
                // no history, just add the current value
                this.history.unshift(this.elem.value);
            }
            // reset histidx
            this.histidx = -1;
            // pop last history value if we're over histsize
            if (this.history.length > this.histsize) {
                this.history.pop();
            }
        }

        if (event.key == "r" && event.ctrlKey) {
            // don't let C-r refresh the page while inside the input box
            event.preventDefault();
            event.stopPropagation();
            // TODO handle C-r
            console.log("C-r search")
        }

        if (event.isComposing || event.keyCode === 229) {
            // handle Compose events for CJKT users by doing nothing
            // see https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event
            return;
        }

        if (this.partial != "") {
            // if partial is set, we're here because the user has CONTINUED
            // typing after a search found a match. set the value to the stored
            // partial plus what they just typed, move the cursor to end, and
            // clear partial.
            this.elem.value = this.partial + event.key;
            this.elem.setSelectionRange(this.partial.length, this.partial.length);
            this.partial = ""
        }

        if (this.timeout != null) {
            // timer isn't null, so one is set and not expired. kill it
            console.log("clear timeout")
            window.clearTimeout(this.timeout);
        }
        // set a timeout and we're done
        console.log(`set timeout: ${this.interval}`);
        this.timeout = window.setTimeout(this.search.bind(this), this.interval);
    }

    search() {
        // we end up here because the user has typed something and our debounce
        // timer has expired. first order of business is to set the timeout var
        // back to null
        this.timeout = null;
        console.log(`search: '${this.elem.value}'`)
    }
}

export { Completer };
