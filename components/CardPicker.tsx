import React, {useEffect, useState} from 'react'
import {LegacyCard, LegacyStack, Tag, InlineError, Button, Text, Spinner} from '@shopify/polaris'
import {usePickerModal} from "@/hooks";
import {Obj, PICKER_RESOURCE_TYPE} from "@/services/types";
import {Category} from "@/services/types/Category";
import {User} from "@/services/types/User";
import {Option} from "@/services/types/Option";

const CardPicker = ({
                      type,
                      onSelect,
                      onDelete,
                      items = [],
                      useUrl = true,
                      error = null,
                      disabled = false,
                      selectedItems = [],
                    }: Props) => {

  const pickerModal = usePickerModal()
  const [settings, setSettings] = useState<SettingsByType | null>(null)
  const [loading, setLoading] = useState(false);

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
      disabled={disabled || loading}
      onRemove={
        typeof onDelete === 'function' ? () => {
          setLoading(true);
          onDelete(item).finally(() => setLoading(false))
        } : undefined
      }
    >{title}</Tag>
  }

  return settings && <LegacyCard
    title={
      <LegacyStack alignment={'center'}>
        <Text as={'span'} variant={'headingMd'}>{settings.title}</Text>
        {
          loading && <Spinner size={'small'}/>
        }
      </LegacyStack>
    }
    sectioned
    actions={[{
      content: 'Edit',
      onAction: onEdit,
      disabled: disabled || loading
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
      return 'name'
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
      return `/admin/categories/${item.id}`
    case PICKER_RESOURCE_TYPE.OPTION:
    case PICKER_RESOURCE_TYPE.OPTIONS:
      return `/admin/options/${item.id}`
    case PICKER_RESOURCE_TYPE.USER:
    case PICKER_RESOURCE_TYPE.USERS:
      return `/admin/users/${item.id}`
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
  items: Obj[] | Category[] | User[] | Option[],
  useUrl?: boolean,
  error?: null,
  disabled?: boolean,
  selectedItems: string[],
}