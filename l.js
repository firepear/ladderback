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

window.ladderback.i.toggleDebug = function () {
    window.ladderback.i.debug = true;
    window.ladderback.i.dout  = document.getElementById("debugoutput");
}

    // add the debug fuction
window.ladderback.i.log = function (msg) {
    if (window.ladderback.i.debug) {
        try {
            window.ladderback.i.dout.append(`${msg}\n`);
        } catch (err) {
            if (window.ladderback.i.logfail) {
                console.log("ladderback: can't find debugoutput");
                window.ladderback.i.logfail = false;
            }
            console.log(msg)
        }
    }
}
