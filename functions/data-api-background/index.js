const axios = require('axios');
const saveFile = require('./save.js')
require('dotenv').config();

const validatePayload = require('./validator');
const getCalendarData = require('./calendar');
const getDiningData = require('./dining');

const { API_USERNAME, API_PASSWORD, API_AUTH_ENDPOINT } = process.env;

const getAuthToken = async () =>
  axios.post(
    API_AUTH_ENDPOINT,
    { username: API_USERNAME, password: API_PASSWORD },
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );

const handler = async (event) => {
  let res;
  try {
    // validating payload to ensure method and type query params are sent
    validatePayload(event.queryStringParameters);
    res = await getAuthToken();
    // setting token for future requests
    axios.defaults.headers.common.Authorization = `Token ${res.data.key}`;
    
    const calendar = await getCalendarData();
    await saveFile('calendar.json', JSON.stringify(calendar))
    const dining = await getDiningData()
    await saveFile('dining.json', JSON.stringify(dining))
  } catch (error) {
    console.error(error);
    return {
      statusCode: 422,
      body: error.message,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      "message": `We have ${res.length} entries`
    }),
    // max age is 12 hours, generated header with https://cache-control.sdgluck.vercel.app/
    headers:
        { 'cache-control': 'no-cache,no-store' },
  };
};

module.exports = { handler };
