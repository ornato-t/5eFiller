const pdfFiller = require('pdffiller');

const sublist = require('./source/spells-sublist'); //User provided spell list from 5e.tools

const spellList = require('./5etools.js'); //Spell list, array of all the spells

const EDITABLE = true;   //Set to false if the resulting pdf should be non-editable

//PDF stuff
const sourcePDF = './source/sheet.pdf';
const destinationPDF = './output/sheet_filled.pdf';


let sub = sublist.items.map(elem => { //Pretty prints every entry and separates spell name from its source
    let wrap = Object();
    let temp = elem.h.replace(/%20/g, ' '); //regexp finds '%20' globally => replaces every instance

    wrap.name = temp.slice(0, temp.indexOf('_'));
    wrap.src = temp.slice(temp.indexOf('_') + 1);

    return wrap
})

let spells = Array();
sub.forEach(elem => { //For each spell in the list,look for a match in the whole dataset. When found, retrieve some data and prune the rest - save the result in spells array
    let entry = Object();

    spellList.forEach(spell => {
        if (spell.name.toLowerCase() === elem.name.toLowerCase() && spell.source.toLowerCase() === elem.src.toLowerCase()) {
            entry.name = spell.name;
            entry.level = spell.level;
            entry.page = spell.page;
            entry.book = elem.src;
            if (spell.duration[0].concentration) entry.concentration = true
        }
    })

    spells.push(entry);
});

let ordered = [ //Data structure for spells (divided by level)
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

spells.forEach(elem => { ordered[elem.level].push(elem) }); //Divide spells by level
ordered.forEach(row => { //Sort each level by spell name (so every level array is in alphabetic order)
    row.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });
});

let data = Object()
ordered.forEach((elem, i) => { //Fills the data object with pairs of {field id: text to fill field}
    elem.forEach((item, j) => {
        //WARNING: IF SOMETHING BREAKS IT'S PROBABLY THIS.  On spells with very long spell names (or otherwise many chars in the field) it might trigger a 'RangeError: Invalid count value' error. In that case just raise the hardcoded int (default is 40)
        data[`${i} ${j+1}`] = `${item.name} ${item.concentration ? '*' : ''} ${'\xa0'.repeat(40-(item.name.length + 1 + item.book.length + item.book.toString().length))} ${item.book.toUpperCase()}:${item.page}`; //Neat trick: create whitespaces by printing as many non-breakaing spaces (\xa0 or 16) as space available. Not perfect because different chars take different amounts of space
    })
})

console.log('Resulting spell list:\n');
console.log(data);

pdfFiller.fillFormWithFlatten( sourcePDF, destinationPDF, data, !EDITABLE, err => {
    if (err) throw err
    console.log('Conversion complete!');
})