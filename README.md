# 5eFiller
Filling D&amp;D character sheets using data pulled from the 5e.tools utility website.  
At the moment this app only allows filling of a spell list. Future releases might contain additional customizations.

# Installation
Requirements:
* nodeJS
* npm
  
Clone the app and run `npm i` in order to download the app's dependencies.

# Usage
You'll have to provide a suitable character sheet PDF and .json file.  
The out-of-the-box version provides a suitable sheet in Italian. Future releases might include different languages, including English. Details on the PDF format are explained in the [format](#format) paragraph.

You'll also have to download a spell sublist from the 5e.tools "Spells" page ("Download pinned list" button from the hamburger menu on said page)

# Format
The PDF needs to follow some formatting rules for it to be correctly readable. 
It needs to be a fillable file with a separate field for each spell row. Each row needs to be named in the following way:  
`SPELL_LEVEL <space> ROW_NUMBER` with ROW_NUMBER starting from 1.  
For example the first level 1 spell would be `1 1`, the second `1 2` and so on. Cantrips are considered as 0th level spells.

Note that the resulting PDF will no longer be fillable, therefore  any edit to the sheet should be done separately before running the app.