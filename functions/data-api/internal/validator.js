const { Validator } = require('jsonschema');

const v = new Validator();

const validatePayload = (body) => {
  const schema = {
    type: 'object',
    properties: {
      method: { type: 'string', enum: ['get', 'cache'] },
      type: {
        type: 'string',
        enum: ['calendar', 'lodging', 'dining', 'store'],
      },
    },
    required: ['method', 'type'],
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
