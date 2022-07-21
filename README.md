# ladderback
The ladder-backed woodpecker (Dryobates scalaris) is a small
woodpecker with a barred pattern on its back and wings resembling the
rungs of a ladder. It can be found year-round over the southwestern
US, most of Mexico, and as far south as Nicaragua.

[![Image of a ladderback woodpecker, perched on a juniper twig](ladderback.jpg)](ladderback.jpg)  

This is a small Javascript widget library with zero dependencies. It
also does not interoperate with modern frameworks, and is almost
certainly not what you're looking for :)

## Using ladderback

Import the module:

`<script type="module" src="./path/to/ladderback/l.js"></script>`

Get a handle on the ladderback object:

`l = window.ladderback;`

Then instantiate widgets as you please.

## Widget reference

### Completer

A Completer is an `input` field, with history, which autocompletes
from history after a debounce interval.

```
// instantiate a ladderback Complete widget with no history and all defaults
c1 = new l.completer({id: "completer1"});
// and hand the input element to a parent element
someElem.appendChild(c1.elem);

// ...later on, in a processing flow
let completerValue = c1.getValue();
```

Constructor arguments:

| Name     | Opt | Default | Desc                                                                    |
|----------|-----|--------:|-------------------------------------------------------------------------|
| id       | No  | None    | Sets the `id` and `name` attributes of the widget's `input` element     |
| size     | Yes | 35      | Width of the `input` field                                              |
| history  | Yes | `[]`    | List of strings; allows prepopulation of widget history                 |
| histsize | Yes | 100     | How many entries to keep in history                                     |
| interval | Yes | 500     | Debounce delay, in milliseconds                                         |

Autocomplete works like it does in `bash` and other applications which
use the `readline` library, except with a debounce timer rather than
using tab to initiate completion: when the timer expires, history will
be searched and the value of the widget's `input` field will be used
as a prefix search, begining with the most recent element of the
history. The first match found will be swapped in as the value of the
`input`.

Pressing `Ctrl+r` (as expected from `readline`) performs another
history search, starting from the last search result and looping
through history.

Pressing `Enter` (as expected from `bash`), or pressing `Tab`/clicking
away to blur the input element (as expected from browsers), finalizes the
completion by adding the current text to history and doing a bit of
internal housekeeping.
