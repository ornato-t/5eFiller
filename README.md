# 5eFiller
Filling D&amp;D character sheets using data pulled from 5etools.  
At the moment this app only allows filling of a spell list. Future releases might contain additional customizations.

# Installation
Requirements:
* nodeJS
* npm
* [PDF Toolkit](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/)
  
Clone the app and run `npm i` in order to download the app's dependencies.

# Usage
You'll have to provide a suitable character sheet PDF and .json file.  
The out-of-the-box version provides a suitable sheet in Italian. Future releases might include different languages, including English. Details on the PDF format are explained in the [format](#format) paragraph.

You'll also have to download a spell sublist from the 5e.tools "Spells" page ("Download pinned list" button from the hamburger menu on said page)

Both files need to be placed in the `/source` directory before running the app. A sample `spell-sublist.json` file is already present in this repository.

Once you have everything set up just run `node index.js` and the app will take care of the rest. The resulting pdf will be in the `/output` directory and will end in `_filled.pdf`

# Format
The PDF needs to follow some formatting rules for it to be correctly readable. 
It needs to be a fillable file with a separate field for each spell row. Each row needs to be named in the following way:  
`SPELL_LEVEL <space> ROW_NUMBER` with ROW_NUMBER starting from 1.  
For example the first level 1 spell would be `1 1`, the second `1 2` and so on. Cantrips are considered as 0th level spells.

The resulting PDF will still be fillable. Alternatively, it's possible to make it non-fillable (thereby flattening any form field) by setting `EDITABLE = false` in the code.