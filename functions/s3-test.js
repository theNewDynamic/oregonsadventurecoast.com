const saveFile = require('./data-api-background/save.js')
// json data
var jsonData = '{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';


const handler = async (event) => {
  try {
    let test = await saveFile('test.json', jsonData)
  } catch (error) {
    return {
      statusCode: 422,
      body: error.message,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      "message": `We have saved the file entries`
    }),
    // max age is 12 hours, generated header with https://cache-control.sdgluck.vercel.app/
    headers:
        { 'cache-control': 'no-cache,no-store' },
  };
}
module.exports = { handler };