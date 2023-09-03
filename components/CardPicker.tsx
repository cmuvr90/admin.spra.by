import React, {useEffect, useState} from 'react'
import {LegacyCard, LegacyStack, Tag, InlineError, Button} from '@shopify/polaris'
import {usePickerModal} from "@/hooks";
import {Obj, PICKER_RESOURCE_TYPE} from "@/services/types";
import {Category} from "@/services/types/Category";
import {User} from "@/services/types/User";

const CardPicker = ({
                      type,
                      onSelect,
                      onDelete,
                      items = [],
                      useUrl = true,
                      error = null,
                      selectedItems = [],
                    }: Props) => {

  const pickerModal = usePickerModal()
  const [settings, setSettings] = useState<SettingsByType | null>(null)

  useEffect(() => {
    setSettings(getSettingsByType(type))
  }, [])

  const onEdit = () => {
    pickerModal[type]({onSelect, selectedItems})
  }

  const onRenderItem = (item: Obj) => {
    if (!settings) return null;

    const url = useUrl ? getUrlByType(item, type) : undefined

    const title = useUrl ?
      <Button plain monochrome url={url}>
        {item[settings.items.field]}
      </Button> : item[settings.items.field]

    return <Tag
      key={item.id}
      onRemove={typeof onDelete === 'function' ? () => onDelete(item) : undefined}
    >{title}</Tag>
  }

  return settings && <LegacyCard
    title={settings.title}
    sectioned
    actions={[{
      content: 'Edit',
      onAction: onEdit,
    }]}>
    <LegacyStack>
      {
        items.map(onRenderItem)
      }
    </LegacyStack>
    {
      !!error && <InlineError message={error} fieldID={type}/>
    }
  </LegacyCard>
}

export default CardPicker

function getSettingsByType(type: PICKER_RESOURCE_TYPE) {
  return {
    title: getTypeByType(type),
    items: {
      field: getFieldByType(type),
    },
  }
}

function getTypeByType(type: PICKER_RESOURCE_TYPE) {
  switch (type) {
    case PICKER_RESOURCE_TYPE.CATEGORY:
      return 'Category'
    case PICKER_RESOURCE_TYPE.CATEGORIES:
      return 'Categories'
    case PICKER_RESOURCE_TYPE.OPTION:
      return 'Option'
    case PICKER_RESOURCE_TYPE.OPTIONS:
      return 'Options'
    case PICKER_RESOURCE_TYPE.USER:
      return 'User'
    case PICKER_RESOURCE_TYPE.USERS:
      return 'Users'
  }
}

function getFieldByType(type: PICKER_RESOURCE_TYPE) {
  switch (type) {
    case PICKER_RESOURCE_TYPE.CATEGORY:
    case PICKER_RESOURCE_TYPE.CATEGORIES:
      return 'title'
    case PICKER_RESOURCE_TYPE.OPTION:
    case PICKER_RESOURCE_TYPE.OPTIONS:
      return 'title'
    case PICKER_RESOURCE_TYPE.USER:
    case PICKER_RESOURCE_TYPE.USERS:
      return 'email'
  }
}

function getUrlByType(item: Obj, type: PICKER_RESOURCE_TYPE) {
  switch (type) {
    case PICKER_RESOURCE_TYPE.CATEGORY:
    case PICKER_RESOURCE_TYPE.CATEGORIES:
      return `/categories/${item.id}`
    case PICKER_RESOURCE_TYPE.OPTION:
    case PICKER_RESOURCE_TYPE.OPTIONS:
      return `/options/${item.id}`
    case PICKER_RESOURCE_TYPE.USER:
    case PICKER_RESOURCE_TYPE.USERS:
      return `/users/${item.id}`
  }
}

type SettingsByType = {
  title: string,
  items: {
    field: string,
  },
}

type Props = {
  type: PICKER_RESOURCE_TYPE
  onSelect?: (value: any) => Promise<any>
  onDelete?: (value: any) => Promise<void>,
  items: Obj[] | Category[] | User[],
  useUrl?: boolean,
  error?: null,
  selectedItems: string[],
}