import React from 'react';

import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { BaseHeaderLayout } from '@strapi/design-system/Layout';

import { useIntl } from 'react-intl';
import  getTrad  from '../../../utils/getTrad';

import {Equalizer,Pencil} from '@strapi/icons';
import { LinkButton } from '@strapi/design-system';

const Header = (seoComponent) => {
  const { formatMessage } = useIntl();
  return (
    <Box background="neutral100">
      <BaseHeaderLayout
        title={formatMessage({
          id: getTrad('kvcr-property.plugin.title'),
          defaultMessage: 'Property Manager',
        })}
        subtitle={formatMessage({
          id: getTrad('kvcr-property.plugin.description'),
          defaultMessage: 'Manage your property',
        })}
        as="h2"
      />
    </Box>
  );
};

export default Header;