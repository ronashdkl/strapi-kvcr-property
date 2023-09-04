'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('kvcr-property')
      .service('myService')
      .getWelcomeMessage();
  },
});
