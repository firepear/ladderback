# ladderback
The ladder-backed woodpecker (Dryobates scalaris) is a small
woodpecker with a barred pattern on its back and wings resembling the
rungs of a ladder. It can be found year-round over the southwestern
US, most of Mexico, and as far south as Nicaragua.

[![Image of a ladderback woodpecker, perched on a juniper twig](ladderback.jpg)](ladderback.jpg)  
_A female ladderback, on a juniper branch in New Mexico_

This is a small Javascript widget library with zero dependencies. It
also does not interoperate with modern frameworks, and is almost
certainly not what you're looking for :)

## Using ladderback

Import the module:

`<script type="module" src="./path/to/ladderback/l.js"></script>`

Since ladderback uses ES6 modules, wait until the `DOMContentLoaded`
event has fired, then get a handle on the ladderback object using a
mechanism like:

```
<script>
'use strict';
let l;

function initLadderback() {
    l = window.ladderback;

    // init widgets here, or in another function/script called later
}

document.addEventListener("DOMContentLoaded", initLadderback);
</script>
```


### Debugging

Enable ladderback's debug messages from widgets by calling
`l.toggleDebug();` at any time, though before instantiating widgets is
ideal to catch all possible messages.

If you have test page and place an element with the id `debugoutput`
on it, ladderback will write debug entries to it. See the test pages
in this repo for CSS hints. As a fallback, debug messages will go to
the JS console.

If you'd like to have app messages appear in the same stream, you can
call `l.log(msg)`.


## Widget reference

### Completer

A Completer is an `input` field, with history, which autocompletes
from local history after a debounce interval. There is no provision
for live, networked fetching of completions, though you can generate a
list via any mechanism you like and pre-populate widget history with
it during the constructor call.

```
// instantiate a ladderback Complete widget with no history and all defaults
comp1 = new l.completer({id: "completer1",
                         parent: document.getElementById("someElem")});

// ...later on, in a processing flow
let completerValue = comp1.getData();
```

The new widget will be appended as a child of `someElem`.

Constructor arguments:

| Name     | Opt | Default | Desc                                                                    |
|----------|-----|--------:|-------------------------------------------------------------------------|
| id       | No  | None    | Sets the `id` and `name` attributes of the widget's `input` element     |
| parent   | No  | None    | The DOM id of the page element where the Completer should appear        |
| size     | Yes | 35      | Width of the `input` field                                              |
| history  | Yes | `[]`    | List of strings; allows prepopulation of widget history                 |
| histsize | Yes | 100     | How many entries to keep in history                                     |
| interval | Yes | 500     | Debounce delay, in milliseconds                                         |

Autocomplete works like it does in `bash` and other applications which
use the `readline` library, except with a debounce timer rather than
using tab to initiate completion.

When the interval of time defined by the `interval` constructor
parameter has elapsed since the last keypress, history will be
searched with the current value of the widget's `input` field will be
used as a prefix. The first match found will be swapped in as the
value of the `input`.

Pressing `Ctrl-r` (as expected from `readline`) performs another
history search, starting from the last search result and looping
through history with subsequent presses of `Ctrl-r`.

Pressing `Ctrl-u` (as expected from `readline`) blanks the input box,
as a convenience function.

Pressing `Enter` (as expected from `bash`), or pressing `Tab` / clicking
away to blur the input element (as expected from browsers), finalizes the
completion by adding the current text to history and doing a bit of
internal housekeeping.

## Styling

All ladderback widgets set CSS classes on themselves, so you can style them.

| Widget    | className     | Elements         |
|-----------|---------------|------------------|
| Completer | `lbCompleter` | `input`          |
| Tagger    | `lbTagger`    | `button`, `span` |
