import {useModal} from './index'
import React, {useEffect, useState} from 'react'
import UsersPicker from "@/components/UsersPicker";
import {Obj, PICKER_RESOURCE_TYPE} from "@/services/types";
import {getUsers} from "@/serverActions/user";
import CategoriesPicker from "@/components/CategoriesPicker";
import {getCategories} from "@/serverActions/category";
import OptionsPicker from "@/components/OptionsPicker";
import {getOptions} from "@/serverActions/option";

export function usePickerModal() {
  const modal = useModal()
  const [data, setData] = useState<Obj[] | Obj | null>(null)

  /**
   *
   */
  useEffect(() => {
    modal.primary.disable(!data)
  }, [data])

  /**
   *
   * @param type
   * @param onSelect
   * @param multiselect
   * @param title
   * @param content
   */
  const open = ({
                  type,
                  onSelect,
                  title = '',
                  content = null,
                  selectedItems = [],
                }: OpenMethodProps) => {
    if (!type) return

    switch (type) {
      case PICKER_RESOURCE_TYPE.USER :
      case PICKER_RESOURCE_TYPE.USERS : {
        content = <UsersPicker
          apiMethod={getUsers}
          onSelect={setData}
          multiselect={type === PICKER_RESOURCE_TYPE.USERS}
          selectedItems={selectedItems}
        />
        title = !!title?.length ? title : 'Users'
      }
        break
      case PICKER_RESOURCE_TYPE.CATEGORY :
      case PICKER_RESOURCE_TYPE.CATEGORIES : {
        content = <CategoriesPicker
          apiMethod={getCategories}
          onSelect={setData}
          multiselect={type === PICKER_RESOURCE_TYPE.CATEGORIES}
          selectedItems={selectedItems}
        />
        title = !!title?.length ? title : 'Categories'
      }
        break
      case PICKER_RESOURCE_TYPE.OPTION :
      case PICKER_RESOURCE_TYPE.OPTIONS : {
        content = <OptionsPicker
          apiMethod={getOptions}
          onSelect={setData}
          multiselect={type === PICKER_RESOURCE_TYPE.OPTIONS}
          selectedItems={selectedItems}
        />
        title = !!title?.length ? title : 'Options'
      }
        break
    }

    modal.change({
      open: true,
      title: title ?? 'Resource picker',
      content: <div style={{minHeight: '360px'}}>{content}</div>,
      primaryAction: {
        content: 'Select',
        disabled: true,
        onAction: () => {
          modal.primary.loading()

          setData(value => {
            if (typeof onSelect === 'function') {
              onSelect(value).finally(() => {
                modal.close()
              })
            }
            return value
          })
        },
      },
    })
  }

  return {
    user: (params = {}) => open({type: PICKER_RESOURCE_TYPE.USER, ...params}),
    users: (params = {}) => open({type: PICKER_RESOURCE_TYPE.USERS, ...params}),
    categories: (params = {}) => open({type: PICKER_RESOURCE_TYPE.CATEGORIES, ...params}),
    category: (params = {}) => open({type: PICKER_RESOURCE_TYPE.CATEGORY, ...params}),
    option: (params = {}) => open({type: PICKER_RESOURCE_TYPE.OPTION, ...params}),
    options: (params = {}) => open({type: PICKER_RESOURCE_TYPE.OPTIONS, ...params}),
  }
}


type OpenMethodProps = {
  type: PICKER_RESOURCE_TYPE
  onSelect?: (value: any) => Promise<any>
  title?: string,
  content?: string | React.JSX.Element | null,
  selectedItems?: any[],
}