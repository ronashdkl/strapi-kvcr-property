import { Table,Tr,Thead,Tbody,TFooter, Th, Td } from '@strapi/design-system/Table'
import { Box} from '@strapi/design-system/Box'
import React from 'react'
import { LinkButton } from '@strapi/design-system/v2';
import pluginId from '../../../pluginId';
import { NavLink } from 'react-router-dom';

const Properties = ({items}) => {
  return (
   <>
   <Box padding={8}>
    <Table>
    <Thead>
        <Tr>
            <Th >
                Name
            </Th>
            <Th>Action</Th>
        </Tr>
    </Thead>
    <Tbody>
        {
            items.map((item,index)=><Tr key={index}>
                <Td>{item.name}</Td>
                <Td><LinkButton as={NavLink} to={`/plugins/${pluginId}/${item.id}`}>Manage Amenities</LinkButton></Td>
            </Tr>)
        }
    </Tbody>
    </Table>
   </Box>
   </>
  )
}

export default Properties