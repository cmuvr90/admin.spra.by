'use client';

import React from 'react'
import {Button, Card, Icon, LegacyStack, Page, Text} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {CircleInformationMajor} from "@shopify/polaris-icons";

export const SettingsTemplate = () => {
  return <Page title={'Settings'}>
    <LegacyStack>
      <Card>
        <div style={{minWidth: '200px'}}>
          <LegacyStack vertical distribution={'fill'}>
            <LegacyStack>
              <Icon source={CircleInformationMajor}/>
              <Text as={'h3'} fontWeight={'bold'}>Information</Text>
            </LegacyStack>
            <LegacyStack distribution={'trailing'}>
              <Button plain url={'/admin/settings/information'}>Edit</Button>
            </LegacyStack>
          </LegacyStack>
        </div>
      </Card>
    </LegacyStack>
  </Page>
}
