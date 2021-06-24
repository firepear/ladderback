export function debounce(event) {
    window.clearTimeout(this.timeout);
    if (event.key == "Enter" || event.key == "Tab") {
        this.cleanup.bind(this);
        return;
    }

    if (event.key == "r" && event.ctrlKey) {
        // don't let C-r refresh the page while inside the input box
        event.preventDefault();
        event.stopPropagation();
        this.loop = true;
        this.partial = this.oldpartial;
        this.histidx = this.oldidx;
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

