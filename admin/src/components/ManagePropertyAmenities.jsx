import React, { useState } from 'react'
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { Alert, Button } from '@strapi/design-system';
import { List } from '@strapi/icons';
import AmenitiesModal from './AmenitiesModal';


const ManagePropertyAmenities = () => {
  const { layout, isCreatingEntry, modifiedData } = useCMEditViewDataManager();
  const propertyApiID = ['property'];
  const isPropertyPage = propertyApiID.includes(layout.apiID);
  const [modal, setModal] = useState(false)
  if (!isPropertyPage) {
    return null;
  }
  if (isCreatingEntry) return <Alert closeLabel="Close" title="Amenities">Save the entity to manage Amenities</Alert>
  return (
    <>
      <Button onClick={() => setModal(true)} startIcon={<List />} >Manage Amenities</Button>
      {
        modal && <AmenitiesModal propertyId={modifiedData.id} setShowModal={setModal} />
      }
    </>
  )
}

export default ManagePropertyAmenities