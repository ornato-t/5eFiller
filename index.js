var pdfFiller = require('pdffiller');

var sourcePDF = "source/scheda.pdf";
var destinationPDF = "output/scheda_filled.pdf";
var data = {
    "0 1": "Fire Bolt",
    "1 1": "Cure Wounds",
    "2 4": "Heat Metal",
    "3 2": "P A L L A  D I  F U O C O"
};

pdfFiller.fillForm(sourcePDF, destinationPDF, data, function(err) {
    if (err) throw err;
    console.log("In callback (we're done).");
});