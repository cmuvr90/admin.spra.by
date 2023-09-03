import React from 'react'
import {Text, LegacyStack} from '@shopify/polaris'
import {Obj, ResourcesPickerProps} from "@/services/types";
import ResourcesPicker from "@/components/ResourcesPicker";

const UsersPicker = ({apiMethod, onSelect, multiselect = false, selectedItems = []}: ResourcesPickerProps) => {

  const onRenderItem = (item: Obj) => {
    const {firstName, lastName, email} = item

    return <LegacyStack vertical spacing={'none'}>
      <Text variant='bodyMd' fontWeight='bold' as='h3'>
        {`${firstName} ${lastName}`}
      </Text>
      <Text variant='bodySm' color={'subdued'} as={'span'}>
        {email}
      </Text>
    </LegacyStack>
  }

  return <ResourcesPicker
    onSelect={onSelect}
    apiMethod={apiMethod}
    onRenderItem={onRenderItem}
    multiselect={multiselect}
    selectedItems={selectedItems}
  />
}

export default UsersPicker
