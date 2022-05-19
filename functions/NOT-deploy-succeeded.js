const { MeiliSearch } = require('meilisearch')
/////
// Rename to deploy-succeeded.js once in production
/////

// Following functions decode context data and turns it into an object:
const extractNetlifySiteFromContext = function(context) {
  let site = {site_url: "http://localhost:8888"}
  if(typeof context.clientContext.custom !== "undefined") {
    site = JSON.parse(Buffer.from(context.clientContext.custom.netlify, "base64").toString("utf-8"))
  }
  return site
}

exports.handler = async function(event, context) {

  const client = new MeiliSearch({
    host: process.env.MEILI_HOST,
    apiKey: process.env.MEILI_PRIVATE_KEY,
  })

  const apps = [
    {
      id: 'dining_229',
      endpoint: '/dining/index.json'
    },
    {
      id: 'lodging_229',
      endpoint: '/lodging/index.json'
    },
    {
      id: 'shopping_229',
      endpoint: '/shopping/index.json'
    }
  ]

  const {site_url} = extractNetlifySiteFromContext(context)
  // An index is where the documents are stored.
  let successes = []
  for (const app of apps) {
    const index = client.index(app.id)

    const documents = await fetch(site_url + app.endpoint).then(response => {
      if(response.ok) {
        return response.json()
      }
    })
    const deleteResponse = await index.deleteAllDocuments()
    deleteOuput = {
      type: 'delete',
      response: deleteResponse,
      index: app.id,
    }
    successes.push(deleteOuput)
    // If the index 'movies' does not exist, MeiliSearch creates it when you first add the documents.

    let response = await index.addDocuments(documents)
    output = {
      type: 'add',
      response,
      index: app.id,
      documents: documents.length
    }
    successes.push(output)
    console.log(output)
    let responseCheck = await index.getDocuments({
      limit: 1000,
      attributesToRetrieve: ['title']
    })
    const retrievedDocuments = responseCheck
    const pass = retrievedDocuments.length === documents.length
    checkOutput = {
      type: 'get',
      response: pass ? 'bravo' : `${retrievedDocuments.length} found on Meili but ${documents.length} found on the site.`,
      index: app.id,
      documents: documents.length
    }
    successes.push(checkOutput)
    console.log(checkOutput)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(successes)
  };
}