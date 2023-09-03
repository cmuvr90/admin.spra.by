import React from 'react'
import {ResourcesPickerProps} from "@/services/types";
import ResourcesPicker from "@/components/ResourcesPicker";

const CategoriesPicker = ({apiMethod, onSelect, multiselect = false, selectedItems = []}: ResourcesPickerProps) => {

  return <ResourcesPicker
    onSelect={onSelect}
    apiMethod={apiMethod}
    multiselect={multiselect}
    selectedItems={selectedItems}
  />
}

export default CategoriesPicker