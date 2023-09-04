import { Checkbox, Dialog, DialogBody, DialogFooter, Flex, Grid, GridItem, TextInput, Button, Typography, ToggleInput, NavLink, Link, LinkButton } from '@strapi/design-system'
import React, { useState, useCallback } from 'react'
import { ExclamationMarkCircle, Trash, Eye } from '@strapi/icons'
import useThrottle from '../../hooks/useThrottle'

const AmenityLink = ({ amenity, propertyId, propertyAmenity, onLink, onUnlink,isLoading }) => {
    const [linked, setIsLinked] = useState(propertyAmenity !== undefined)

    const initialDescription = propertyAmenity?.description??amenity.description
    const [description, setDescription] = useState(initialDescription??'')
    const [confirmModal, setConfirmModal] = useState(false);
    const throttle = useThrottle((value) => {
        onLink({
            id: propertyAmenity?.id ?? 0,
            description:value
        });
    }, 1000);
    function handleCheck(e) {
        console.log(amenity, propertyId, propertyAmenity, 'click')
        if (linked && propertyAmenity) {
            setConfirmModal(true)
        } else {
            onLink({
                property: propertyId, description, amenitie: amenity.id
            }).then(()=>{
                setIsLinked(true)
            })
        }
       
    }
    const changeHandler = useCallback((e) => {
        setDescription(e.target.value)
        throttle(e.target.value);
    }, [throttle, setDescription])

    return (
        <>
            <Grid gap={2} background="secondary100" marginTop={4} padding={2} alignItem="center">
                <GridItem padding={1} col={3} s={12}>
                    <ToggleInput  size="S"  disabled={isLoading}  checked={linked} onLabel="Yes" offLabel="No" onChange={handleCheck} hint={amenity.description} label={amenity.Name}/>
                </GridItem>
                <GridItem padding={1} col={9} s={12}>
                    {
                        linked && <Flex gap={2} alignItems="end" justifyContent="center">
                        <TextInput disabled={isLoading}  value={description ?? ''} onChange={changeHandler} label="Description" hint="Describe this aminity, if not set, parent value will be display. " />
                        </Flex>
                    }
                </GridItem>


            </Grid>
            <Dialog onClose={() => setConfirmModal(false)} title="Confirmation" isOpen={confirmModal}>
                <DialogBody icon={<ExclamationMarkCircle />}>
                    <Flex direction="column" alignItems="center" gap={2}>
                        <Flex justifyContent="center">
                            <Typography id="confirm-description">Are you sure you want to delete this?</Typography>
                        </Flex>
                    </Flex>
                </DialogBody>
                <DialogFooter startAction={<Button onClick={() => setConfirmModal(false)} variant="tertiary">
                    Cancel
                </Button>} endAction={<Button loading={isLoading} onClick={() => {
                    onUnlink(propertyAmenity.id,setConfirmModal).then(()=>{
                        setIsLinked(false)
                    })
                }} variant="danger-light" startIcon={<Trash />}>
                    Confirm
                </Button>} />
            </Dialog>
        </>
    )
}

export default AmenityLink