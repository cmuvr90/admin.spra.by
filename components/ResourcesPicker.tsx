import React, {useEffect, useState} from 'react'
import {ResourceList, ResourceItem, Text, LegacyStack, Pagination, Icon, LegacyFilters} from '@shopify/polaris'
import {CircleTickMajor} from '@shopify/polaris-icons'
import {Obj, Paginator, ResourcesPickerProps} from "@/services/types";
import {ResourceListSelectedItems} from "@shopify/polaris/build/ts/src/utilities/resource-list";

const ResourcesPicker = ({
                           apiMethod,
                           onSelect,
                           multiselect = false,
                           onRenderItem = null,
                           selectedItems = []
                         }: ResourcesPickerProps) => {

  const [items, setItems] = useState<Obj[]>([])
  const [params, setParams] = useState<Obj>({page: 1, limit: 10})
  const [paginator, setPaginator] = useState<Paginator | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [selected, setSelected] = useState<ResourceListSelectedItems>(selectedItems)

  useEffect(() => {
    onGetItems(params).then()
  }, [params])

  const onGetItems = async (params: Obj) => {
    setLoading(true)
    const data = await apiMethod(params);
    setLoading(false)
    if (!data) return
    const {items, paginator} = data
    setItems(items)
    setPaginator(paginator)
  }

  /**
   *
   * @param value
   */
  const changeParams = (value: Obj) => setParams(v => ({...v, ...value}))

  const _onSelect = async (value: ResourceListSelectedItems) => {
    let selectedData: Obj[] | Obj | null;

    if (multiselect) {
      setSelected(Array.isArray(value) ? value : [value])
      selectedData = items.filter(i => `${value}`.includes(i.id)) ?? null
    } else {
      setSelected(Array.isArray(value) ? value : [value])
      selectedData = items.find(i => i.id === value) ?? null
    }

    onSelect(selectedData)
  }

  const defaultRenderItem = (item: Obj) => {
    const label = item?.name ?? (item?.title ?? (item?.label ?? 'no name'))
    return <Text variant='bodyMd' fontWeight='bold' as='h3'>{label}</Text>
  }

  const renderItem = (item: Obj) => {
    const {id} = item
    const content = typeof onRenderItem === 'function' ? onRenderItem(item, selected) : defaultRenderItem(item)

    return <ResourceItem id={id} onClick={() => _onSelect(id)} >
      <LegacyStack alignment={'center'}>
        <LegacyStack.Item fill>
          {content}
        </LegacyStack.Item>
        {
          !multiselect && selected.includes(id) && <Icon source={CircleTickMajor} color={'success'}/>
        }
      </LegacyStack>
    </ResourceItem>
  }

  return <LegacyStack vertical>
    <ResourceList
      loading={loading}
      resourceName={{singular: 'item', plural: 'items'}}
      items={items}
      renderItem={renderItem}
      selectable={multiselect}
      selectedItems={multiselect ? selected : undefined}
      onSelectionChange={multiselect ? _onSelect : undefined}
      filterControl={
        <LegacyFilters
          queryValue={params?.query ?? ''}
          filters={[]}
          onQueryChange={query => changeParams({query})}
          onQueryClear={() => changeParams({query: ''})}
          onClearAll={() => changeParams({query: ''})}
        />
      }
    />
    {
      (!!paginator && (paginator.prev || paginator.next)) &&
      <LegacyStack distribution={'center'}>
        <Pagination
          hasPrevious={paginator.prev || loading}
          hasNext={paginator.next || loading}
          onPrevious={() => changeParams({page: paginator.page - 1})}
          onNext={() => changeParams({page: paginator.page + 1})}
        />
      </LegacyStack>
    }
  </LegacyStack>
}

export default ResourcesPicker