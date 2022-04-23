const pdfFiller = require('pdffiller')

//JSON data from 5e.tools here (code needs updates on every folder update. folder SHOULD self update via git)
const ai = require('./spells/spells-ai.json')
const aitfr = require('./spells/spells-aitfr-avt.json')
const egw = require('./spells/spells-egw.json')
const ftd = require('./spells/spells-ftd.json')
const ggr = require('./spells/spells-ggr.json')
const llk = require('./spells/spells-llk.json')
const phb = require('./spells/spells-phb.json')
const scc = require('./spells/spells-scc.json')
const tce = require('./spells/spells-tce.json')
const xge = require('./spells/spells-xge.json')

const sublist = require('./source/spells-sublist') //User provided spell list from 5e.tools

//PDF stuff
const sourcePDF = "./source/scheda.pdf"
const destinationPDF = "./output/scheda_filled.pdf"


let sub = sublist.items.map(elem => { //Pretty prints every entry and separates spell name from its source
    let wrap = Object()
    let temp = elem.h.replace(/%20/g, ' ') //regexp finds '%20' globally => replaces every instance

    wrap.name = temp.slice(0, temp.indexOf('_'))
    wrap.src = temp.slice(temp.indexOf('_') + 1)

    return wrap
})

let spells = Array()
sub.forEach(elem => { //For each spell in the list, open searchSpell loading the correct dataset (book, JSON file) - save the result in spells array
    switch (elem.src) {
        case 'ai':
            spells.push(searchSpell(ai, elem.name, elem.src))
            break
        case 'aitfr':
            spells.push(searchSpell(aitfr, elem.name, elem.src))
            break
        case 'egw':
            spells.push(searchSpell(egw, elem.name, elem.src))
            break
        case 'ftd':
            spells.push(searchSpell(ftd, elem.name, elem.src))
            break
        case 'ggr':
            spells.push(searchSpell(ggr, elem.name, elem.src))
            break
        case 'llk':
            spells.push(searchSpell(llk, elem.name, elem.src))
            break
        case 'phb':
            spells.push(searchSpell(phb, elem.name, elem.src))
            break
        case 'scc':
            spells.push(searchSpell(scc, elem.name, elem.src))
            break
        case 'tce':
            spells.push(searchSpell(tce, elem.name, elem.src))
            break
        case 'xge':
            spells.push(searchSpell(xge, elem.name, elem.src))
            break
    }
});

function searchSpell(src, name, book) { //Search for a match in the matching dataset. When found, retrieve some data and prune the rest
    let entry = Object()
    src.spell.forEach(spell => {
        if (spell.name.toLowerCase() === name) {
            entry.name = spell.name
            entry.level = spell.level
            entry.page = spell.page
            entry.book = book
            if (spell.duration[0].concentration) entry.concentration = true
        }
    })
    return entry
}

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
]

spells.forEach(elem => { ordered[elem.level].push(elem) }) //Divide spells by level
ordered.forEach(row => { //Sort each level by spell name (so every level array is in alphabetic order)
    row.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    })
})

let data = Object()
ordered.forEach((elem, i) => { //Fills the data object with pairs of {field id: text to fill field}
    elem.forEach((item, j) => {
        data[`${i} ${j+1}`] = `${item.name} ${item.concentration ? '*' : ''} ${'\xa0'.repeat(40-(item.name.length + 1 + item.book.length + item.book.toString().length))} ${item.book.toUpperCase()}:${item.page}` //Neat trick: create whitespaces by printing as many non-breakaing spaces (\xa0 or 16) as space available. Not perfect because different chars take different amounts of space
            //WARNING: IF SOMETHING BREAKS IT'S PROBABLY THIS.  On spells with very long spell names (or otherwise many chars in the field) it might trigger a 'RangeError: Invalid count value' error. In that case just raise the hardcoded int (default is 40)
    })
})

console.log(data)

pdfFiller.fillForm(sourcePDF, destinationPDF, data, function(err) {
    if (err) throw err
    console.log("Conversion complete!")
})