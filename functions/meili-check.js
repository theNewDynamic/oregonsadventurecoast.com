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
      id: 'oac-dining',
      endpoint: '/dining/index.json'
    },
    {
      id: 'oac-lodging',
      endpoint: '/lodging/index.json'
    },
    {
      id: 'oac-shopping',
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
    
    let responseCheck = await index.getDocuments({
      limit: 1000,
      fields: ['title', 'id']
    })
    const retrievedDocuments = responseCheck
    const pass = retrievedDocuments.total === documents.length
    let toDelete = []
    if(!pass) {
      toDelete = retrievedDocuments.results.filter(doc => {
        return !documents.find(siteDoc => siteDoc.id == doc.id)
      }).map(doc => doc.id)
    }
    checkOutput = {
      type: 'get',
      response: pass ? 'bravo' : `${retrievedDocuments.total} found on Meili but ${documents.length} found on the site.`,
      index: app.id,
      documents: documents.length
    }
    if(toDelete.length) {
      checkOutput.to_delete = toDelete
    }
    
    successes.push(checkOutput)
    console.log(checkOutput)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(successes)
  };
}