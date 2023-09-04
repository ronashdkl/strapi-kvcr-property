'use strict';

module.exports = ({ strapi }) => {
  // register phase
  strapi.customFields.register({
    name: "guest",
    plugin: "kvcr-property",
    type: "string",
    inputSize: {
      // optional
      default: 4,
      isResizable: false,
    },
  });
};
