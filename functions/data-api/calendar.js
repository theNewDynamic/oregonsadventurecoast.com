const axios = require('axios');
const cloneDeep = require('clone-deep');
const config = require('./config');

const { BASE_URL } = process.env;

const transformCalendarData = (data) => {
  const localResultsData = cloneDeep(data);
  const transformedData = [];
  localResultsData.forEach((item) => {
    item.attributes.forEach((attribute) => {
      switch (attribute.schema?.name) {
        case 'start_date':
          item.startdate = attribute.value;
          break;
        case 'end_date':
          item.enddate = attribute.value;
          break;
        case 'address1':
          item.address1 = attribute.value;
          break;
        case 'state':
          item.state = attribute.value;
          break;
        case 'zip_code':
          item.zipcode = attribute.value;
          break;
        case 'phone1':
          item.phone1 = attribute.value;
          break;
        case 'phone2':
          item.phone2 = attribute.value;
          break;
        default:
          break;
      }
    });
    item.links?.forEach((link) => {
      if (link.network_type === 'Website') {
        item.website = link.url;
      }
    });

    if (item.startdate) {
      const dateItems = item.startdate.split('-');
      // eslint-disable-next-line prefer-destructuring
      item.month = dateItems[1];
    }
    transformedData.push(item);
  });
  return transformedData;
};

const getCalendarData = async () => {
  const res = await axios.get(`${BASE_URL + config.calendar}`);
  return transformCalendarData(res.data.results);
};

module.exports = getCalendarData;
