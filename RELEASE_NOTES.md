## v0.3.0 (2022-07-22)

- Completer
  - Constructor now has a required `parent` arg, and the resultant
    widget is appended as a child of that element
  - `getValue` renamed `getData` for consistency with future widgets
  - `C-r` skips matches when they are the same as the previous match
  - History loading message now suppressed unless there is history to
    load
  - Widgets now have a CSS classname set on them


## v0.2.0 (2022-07-21)

- Completer
  - Added `C-u` binding to wipe current input (like bash)
  - Fixed bug which allowed history to be initialized with non-string
    values
  - Many, many smaller fixes and improvements
- Other
  - Added debug mode and logging func
  - Better docs
  - `debounce` function modularized


## v0.1.0 (2021-06-12)

- Initial release
- First widget: Completer
