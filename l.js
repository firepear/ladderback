// ladderback widget library

// import the widget modules
import { Completer } from './modules/completer.js';
import { Tagger } from './modules/tagger.js';

// instantiate ladderback object, attach it to `window`, and add
// modules to it
window.ladderback = { completer: Completer,
                      tagger:    Tagger,
                      i:         { debug: false, logfail: true }
                    };

// debug enable function
window.ladderback.toggleDebug = function () {
    if (window.ladderback.i.debug) {
        window.ladderback.i.debug = false;
        return;
    }
    window.ladderback.i.debug = true;
    window.ladderback.i.dout  = document.getElementById("debugoutput");
}

// logging function
//
// sends messages to an element with id `debugoutput` and keeps that
// element scrolled to the bottom, if it exists and that is
// possible. logs to console as a fallback.
window.ladderback.log = function (msg) {
    if (window.ladderback.i.debug) {
        try {
            window.ladderback.i.dout.append(`${msg}\n`);
            window.ladderback.i.dout.scrollTo(0, window.ladderback.i.dout.scrollHeight);
        } catch (err) {
            if (window.ladderback.i.logfail) {
                console.log("ladderback: can't find debugoutput");
                window.ladderback.i.logfail = false;
            }
            console.log(msg)
        }
    }
}
