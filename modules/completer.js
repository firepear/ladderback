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
// C-r to search backward in history for the same prefix
// C-c to abandon search?

class Completer {
    constructor({id, size = 35, history = []}) {
        this.elem = document.createElement("input")
        this.elem.id = id;
        this.elem.name = id;
        this.elem.size = size;
    }
}

export { Completer };
