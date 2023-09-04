import React, { useEffect, useState } from "react";

import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
  Box, TextButton, Stack, Loader, Flex, BaseHeaderLayout, NavLink
} from "@strapi/design-system";
import { repository } from '../../api/property';
import { useSelector, useDispatch } from 'react-redux';
import { setAllData, setLoading } from '../../store/property';
import AmenityLink from "./AmenityLink";
import usePropertyAmenities from "../../hooks/usePropertyAmenities";

export default function AmenitiesModal({ setShowModal, propertyId }) {
  const { amenities, isLoading, propertyAmenities } = useSelector(x => x.kvcrProperty)
  const dispatch = useDispatch();
  const { fetchItems, link, unLink } = usePropertyAmenities(propertyId, dispatch);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading())
      const propertyAmenities = await fetchItems();
      const { data } = await repository.getAmenitiesCategories();
      dispatch(setAllData({ propertyAmenities, amenities: data }))
      console.log(propertyAmenities, data)
    }
    fetchData();
    return () => {

    }
  }, [propertyId])

  console.log(amenities);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setShowModal(false);
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <>
      {
        isLoading && <Box padding={2} background="neutral150">
          <TextButton loading>Running background task...</TextButton>
        </Box>
      }
      <ModalLayout
        onClose={() => setShowModal(false)}
        labelledBy="title"
        as="div"
      >
        <ModalHeader>
         <Stack>
         <Typography fontWeight="bold" textColor="neutral800" variant="alpha" as="h2" id="title">
            Amenities 
          </Typography>
          <TextButton as={NavLink} to="/content-manager/collectionType/api::amenitie.amenitie?page=1&pageSize=10&sort=Name:ASC">Data will auto save. Click here to add more amenities.</TextButton>
         </Stack>
         {isLoading && <Loader small />}
        </ModalHeader>

        <ModalBody>
          <Stack spacing={4}>
            {
              amenities.map((category, index) => <Box key={index}  
              padding={4}
              shadow="filterShadow" borderColor="secondary200"
              >
                <Typography as="h3" fontWeight="light" variant="delta">{category.Name}</Typography>
                {
                  category.amenities.length > 0 && <Box marginTop={4} >
                    {
                      category.amenities.map((amenity, amIndex) => <AmenityLink key={amIndex}
                        isLoading={isLoading}
                        onLink={link}
                        onUnlink={unLink}
                        propertyAmenity={propertyAmenities.find(x => x.amenitie.id === amenity.id)}
                        amenity={amenity} propertyId={propertyId} />)
                    }
                  </Box>
                }

              </Box>)
            }
          </Stack>
        </ModalBody>

        <ModalFooter
          startActions={
            <Button loading={isLoading} onClick={() => setShowModal(false)} variant="tertiary">
              Close
            </Button>
          }

        />
      </ModalLayout>
    </>
  );
}

// endActions={<Button type="submit">Add todo</Button>}
