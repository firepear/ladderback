# twiglets
A Javascript widget library

Not really much of a "library" yet, to be honest, as it contains one widget.

## Using twiglets

Import the module:

`<script type="module" src="./path/to/twiglets/t.js"></script>`

Get a handle on the twiglet object:

`t = window.twiglet;`

Then instantiate widgets as you please.

## Widget reference

### Completer

A Completer is an `input` field, with history, which autocompletes
from history after a debounce interval.

```
// instantiate a twiglet Complete widget with no history and all defaults
c1 = new t.completer({id: "completer1"});
// andhand the input element to a parent element
someelem.appendChild(c1.elem);
```

Constructor arguments:

| Name     | Opt | Default | Desc                                                                    |
|----------|-----|---------|-------------------------------------------------------------------------|
| id       | No  | None    | Sets the `id` and `name` attributes of the widget's `input` element     |
| size     | Yes | 35      | Width of the `input` field |
| history  | Yes | `[]`    | Allows prepopulation of widget history |
| histsize | Yes | 100     | How many entries to keep in history |
| interval | Yes | 500     | Debounce delay, in milliseconds |

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

Pressing `Enter` (as one might expect from `bash`), or `Tab` or
clicking away from the input element (as one might expect from
browsers), finalizes the completion by adding the current text to
history and doing a bit of internal housekeeping.
