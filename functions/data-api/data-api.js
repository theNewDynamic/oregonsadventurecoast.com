const axios = require('axios');
require('dotenv').config();

const validatePayload = require('./internal/validator');
const getCalendarData = require('./internal/calendar');
const getDiningData = require('./internal/dining');

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
    res = await getCalendarData();
    switch (event.queryStringParameters.type) {
      case 'calendar':
        res = await getCalendarData();
        break;
      case 'dining':
        res = await getDiningData();
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 422,
      body: error.message,
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(res),
    // max age is 12 hours, generated header with https://cache-control.sdgluck.vercel.app/
    headers:
      event.queryStringParameters.method === 'get'
        ? {
            'cache-control':
              'public, max-age 43200, stale-while-revalidate 86400',
          }
        : { 'cache-control': 'no-cache,no-store' },
  };
};

module.exports = { handler };
