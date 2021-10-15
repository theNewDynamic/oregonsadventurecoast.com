const { Validator } = require('jsonschema');

const v = new Validator();

const validatePayload = (body) => {
  const schema = {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['calendar', 'lodging', 'dining', 'store'],
      },
    },
    //required: ['type'],
    additionalProperties: false,
  };

  const validationResults = v.validate(body, schema, {
    allowUnknownAttributes: false,
  });
  if (validationResults.errors.length > 0) {
    throw new Error(JSON.stringify(validationResults.errors));
  }
};

module.exports = validatePayload;
