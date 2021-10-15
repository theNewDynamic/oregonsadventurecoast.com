const axios = require('axios');
const cloneDeep = require('clone-deep');
const config = require('./config');

const { BASE_URL } = process.env;

const transformDiningData = (data) => {
  const localResultsData = cloneDeep(data);
  const transformedData = [];
  localResultsData.forEach((item) => {
    item.attributes.forEach((attribute) => {
      switch (attribute.schema?.name) {
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
        case 'restaurants_category':
          item.category = attribute.value.split('|').map((i) => i.trim());
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

    item.relations?.forEach((relation) => {
      if (relation.network_type === 'Cities') {
        item.city = relation.name;
      }
    });
    transformedData.push(item);
  });
  return transformedData;
};

const getDiningData = async () => {
  const res = await axios.get(`${BASE_URL + config.dining}`);
  return transformDiningData(res.data.results);
};

module.exports = getDiningData;
