'use client'

import React, {useEffect, useMemo, useState} from 'react'
import {FormLayout, Modal, Page, TextField, Select} from '@shopify/polaris'
import {NavigateBuilder} from './components/NavigateBuilder'
import {MenuItem} from "@/services/types/Navigation";
import {useMessage, useModal} from "@/hooks";
import {Collection} from "@/services/types/Collection";
import {getCollections} from "@/serverActions/collection";
import {createNavigation, getNavigation, updateNavigation} from "@/serverActions/navigation";

/**
 *
 * @constructor
 */
export const NavigationTemplate = () => {
  const toast = useMessage()
  const modal = useModal()

  const [menuId, setMenuId] = useState<string | null>(null)
  const [menu, setMenu] = useState<MenuItem[]>([])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)
  const [collections, setCollections] = useState<Collection[]>([])

  useEffect(() => {
    setLoading(true)
    onGetMainNavigation().then()
    onGetCollections().then()
    setLoading(false)
  }, [])

  const onGetMainNavigation = async () => {
    try {
      const data = await getNavigation('main');
      if (!!data?.id) {
        setMenu(data?.body ?? []);
        setMenuId(data.id);
      }
    } catch (e) {
      toast.error((e as Error)?.message ?? 'Error');
    }
  }

  /**
   *
   */
  const onGetCollections = async () => {
    try {
      const collectionsData = await getCollections();
      setCollections(collectionsData);
    } catch (e) {
      toast.error((e as Error)?.message ?? 'Error');
    }
  }

  const onCreate = async () => {
    setSaving(true)

    try {
      const data = await createNavigation({type: 'main', body: menu});
      if (!!data?.id) {
        setMenu(data?.body ?? []);
        setMenuId(data.id);
        toast.info('Created')
      }
    } catch (e) {
      toast.error((e as Error)?.message ?? 'Error');
    }
    setSaving(false)
  }

  const onUpdate = async () => {
    setSaving(true)
    try {
      const data = await updateNavigation({id: menuId, type: 'main', body: menu});
      if (!!data?.id) {
        setMenu(data?.body ?? []);
        toast.info('Updated')
      }
    } catch (e) {
      toast.error((e as Error)?.message ?? 'Error');
    }
    setSaving(false)
  }

  /**
   *
   * @param menuItem
   * @param onUpdate
   */
  const onEditMenuItem = async (menuItem: MenuItem, onUpdate: (menuItem: MenuItem) => void) => {
    modal.change({
      open: true,
      title: `Edit menu item`,
      content: <Modal.Section>
        <ModalContent menuItem={menuItem} onChange={onUpdate} collections={collections}/>
      </Modal.Section>,
    })
  }

  return <Page
    title={'Navigation'}
    primaryAction={{
      content: menuId ? 'Update' : 'Create',
      onAction: () => menuId ? onUpdate() : onCreate(),
      loading: saving || loading,
    }}
  >
    <NavigateBuilder
      menu={menu}
      prefix={''}
      onChange={setMenu}
      onEdit={onEditMenuItem}
    />
  </Page>
}

const ModalContent = ({menuItem, collections = [], onChange}: {
  menuItem: MenuItem,
  collections: Collection[],
  onChange: (menuItem: MenuItem) => void
}) => {

  const [title, setTitle] = useState(menuItem?.title)
  const [url, setUrl] = useState(menuItem?.url)
  const [collection, setCollection] = useState(menuItem?.url.replace('/collections/', ''))

  useEffect(() => {
    onChange({...menuItem, title, url})
  }, [title, url])

  useEffect(() => {
    if (collection?.length) setUrl(`/collections/${collection}`)
  }, [collection])

  /**
   *
   * @type {({label: string, value: string}|{label: *, value: *})[]}
   */
  const selectOptions = useMemo(() => {
    const options = collections.map(i => ({label: i.title, value: i.handle}))
    return [{label: '-', value: ''}, ...options]
  }, [collections])

  return <FormLayout>
    <TextField
      label={'Title'}
      value={title}
      autoComplete={'off'}
      onChange={setTitle}
      focused={true}
    />
    <TextField
      label={'Url'}
      value={url}
      autoComplete={'off'}
      onChange={setUrl}
    />
    <Select
      label={'select collection'}
      options={selectOptions}
      value={collection}
      onChange={setCollection}
    />
  </FormLayout>
}
