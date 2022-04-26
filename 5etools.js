//JSON data from 5e.tools here (code needs updates on every folder update. folder SHOULD self update via git)
//Edit - no it doesn't, you utter fool. Needs to be manually updated

const files = [
    require('./spells/spells-ai.json'),
    require('./spells/spells-aitfr-avt.json'),
    require('./spells/spells-egw.json'),
    require('./spells/spells-ftd.json'),
    require('./spells/spells-ggr.json'),
    require('./spells/spells-llk.json'),
    require('./spells/spells-phb.json'),
    require('./spells/spells-scc.json'),
    require('./spells/spells-tce.json'),
    require('./spells/spells-ua-2020por.json'),
    require('./spells/spells-ua-2020smt.json'),
    require('./spells/spells-ua-2021do.json'),
    require('./spells/spells-ua-ar.json'),
    require('./spells/spells-ua-frw.json'),
    require('./spells/spells-ua-mm.json'),
    require('./spells/spells-ua-saw.json'),
    require('./spells/spells-ua-ss.json'),
    require('./spells/spells-ua-tobm.json'),
    require('./spells/spells-xge.json')
]

let spellList = Array()

files.forEach(elem => {
    elem.spell.forEach(item => {
        spellList.push(item)
    })
})

module.exports = spellList