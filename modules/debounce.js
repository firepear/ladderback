export function debounce(event) {
    window.clearTimeout(this.timeout);
    if (event.key == "Enter" || event.key == "Tab") {
        l.i.log(`${this.id}: debounce triggering cleanup on ${event.key}`);
        //this.cleanup.bind(this)();
        this.cleanup();
        return;
    }

    if (event.key == "u" && event.ctrlKey) {
        // in bash, C-u kills the current line of input. this is a
        // convenient way to empty the input box
        event.preventDefault();
        event.stopPropagation();
        this.elem.value = "";
        this.partial = this.elem.value;
        this.oldpartial = this.elem.value;
        return
    }

    if (event.key == "r" && event.ctrlKey) {
        // user has requested a repeat search. don't let C-r refresh
        // the page while inside the input box
        event.preventDefault();
        event.stopPropagation();
        // set loop to true
        this.loop = true;
        this.partial = this.oldpartial;
        this.search();
        return;
    }

    if (event.isComposing || event.keyCode === 229) {
        // handle Compose events for CJKT users by doing nothing
        // see https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event
        return;
    }

    if (this.partial != "" && this.loop == false) {
        // if partial is set and loop is false, we're here because the user
        // has CONTINUED typing after a search found a match.
        this.histidx = -1;
        this.partial = ""
    }

    // set a timeout and we're done
    this.timeout = window.setTimeout(this.search.bind(this), this.interval);
}

