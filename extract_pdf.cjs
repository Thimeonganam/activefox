const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
    console.log("Reading PDF...");
    const dataBuffer = fs.readFileSync('Credential_Active Fox_ver.4.pdf');
    
    console.log("Parsing PDF...");
    const parser = new PDFParse({ data: dataBuffer });
    const result = await parser.getText();
    
    console.log("Pages parsed:", result.pages.length);
    console.log("Writing to credential_extracted.txt...");
    fs.writeFileSync('credential_extracted.txt', result.text);
    console.log("Successfully extracted text from PDF!");
}

main().catch(err => {
    console.error("Error during extraction:", err);
});
