"use strict";

module.exports = ({ strapi }) => ({
  async find(query) {
    return await strapi.entityService.findMany("api::property.property", query);
  },
  async findAmenityCategories() {
    return await strapi.entityService.findMany(
      "api::amenitie-category.amenitie-category",
      {
        populate: {
          amenities: true,
        },
      }
    );
  },
  async getPropertyAmenities(id) {
    return await strapi.entityService.findMany(
      "api::property-amenitie.property-amenitie",
      {
        filters: {
          property: id,
        },
        populate: ["amenitie"],
      }
    );
  },
  async linkPropertyAmenity(data) {
    const { property, amenitie } = data;
    const previouslyLinkedData = await strapi.entityService.findMany(
      "api::property-amenitie.property-amenitie",
      {
        filters: {
          $and: [
            {
              property: property,
            },
            {
              amenitie: {
                id: amenitie,
              },
            },
          ],
        },
      }
    );
    
    if (previouslyLinkedData.length) {
      return { success: false, previouslyLinkedData };
    }
    return await strapi.entityService.create(
      "api::property-amenitie.property-amenitie",
      {
        data,
      }
    );
  },
  async updateLinkPropertyAmenity({id, description}) {
    return await strapi.entityService.update(
      "api::property-amenitie.property-amenitie",id,
      {
        data:{
          description
        }
      }
    );
  },
  async unlinkPropertyAmenity(id) {
    return await strapi.entityService.delete(
      "api::property-amenitie.property-amenitie",id);
  },
});
