const args = process.argv.slice(2)
const data = JSON.stringify(require('./_index.js'))
if(data){
  if(args[0] === "print") {
    const content = JSON.stringify(require('./_index.js'), null, "\t")
    fs = require('fs');
    fs.writeFile("cms_output.json", content, "", () => {console.log("File created at /cms_output.json")})
  } else {
    console.log('No JS error in CC config 👌');
  }
}