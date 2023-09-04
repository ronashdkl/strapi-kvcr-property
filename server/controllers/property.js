"use strict";

module.exports = ({ strapi }) => ({
  async index(ctx) {
    try {
      return await strapi
        .plugin("kvcr-property")
        .service("propertyService")
        .find(ctx.query);
    } catch (error) {
      ctx.trow(500, error);
    }
  },
  async amenities(ctx) {
    try {
      return await strapi
        .plugin("kvcr-property")
        .service("propertyService")
        .findAmenityCategories();
    } catch (error) {
      ctx.trow(500, error);
    }
  },
  async propertyAmenities(ctx) {
    try {
      const {id} = ctx.params;
    
      return await strapi
        .plugin("kvcr-property")
        .service("propertyService")
        .getPropertyAmenities(id);
    } catch (error) {
      ctx.trow(500, error);
    }
  },
  async linkPropertyAmenity(ctx) {
    try {
      const {id} = ctx.params;
      const data = ctx.request.body;
      if(!data.amenitie){
        throw new Error('bad request');
      }

      return await strapi
        .plugin("kvcr-property")
        .service("propertyService")
        .linkPropertyAmenity({
          property:parseInt(id),
          amenitie:data.amenitie
        });
    } catch (error) {
      ctx.trow(500, error);
    }
  },
  async updateLinkPropertyAmenity(ctx) {
    try {
      const {id} = ctx.params;
      const data = ctx.request.body;
     
      return await strapi
        .plugin("kvcr-property")
        .service("propertyService")
        .updateLinkPropertyAmenity({id,description:data.description});
    } catch (error) {
      ctx.trow(500, error);
    }
  },
  async unlinkPropertyAmenity(ctx) {
    try {
      const {id} = ctx.params;
      return await strapi
        .plugin("kvcr-property")
        .service("propertyService")
        .unlinkPropertyAmenity(id);
    } catch (error) {
      ctx.trow(500, error);
    }
  },
});
