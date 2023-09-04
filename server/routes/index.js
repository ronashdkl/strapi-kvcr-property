module.exports = [
  {
    method: 'GET',
    path: '/properties',
    handler: 'propertyController.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/amenities',
    handler: 'propertyController.amenities',
    config: {
      policies: []
    },
  },
  {
    method: 'GET',
    path: '/property/:id/amenities',
    handler: 'propertyController.propertyAmenities',
    config: {
      policies: [],
      auth:false
    },
  },
  {
    method: 'POST',
    path: '/property/:id/amenities',
    handler: 'propertyController.linkPropertyAmenity',
    config: {
      policies: [],
      auth:false
    },
  },
  {
    method: 'POST',
    path: '/property/amenities/:id',
    handler: 'propertyController.updateLinkPropertyAmenity',
    config: {
      policies: [],
      auth:false
    },
  },
  {
    method: 'DELETE',
    path: '/property/amenities/:id',
    handler: 'propertyController.unlinkPropertyAmenity',
    config: {
      policies: [],
      auth:false
    },
  },
];
