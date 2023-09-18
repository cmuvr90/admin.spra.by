'use client';

import React, {useEffect, useState} from 'react'
import {FormLayout, Layout, TextField, Page} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {useSaveBar} from "@/hooks";
import {Obj} from "@/services/types";

export const InformationSettingsTemplate = ({settings: defaultSettings = {informationText: ''}}) => {

  const saveBar = useSaveBar(onUpdate, onDiscard);
  const [settings, setSettings] = useState(defaultSettings)

  useEffect(() => {
    saveBar.onChange(defaultSettings, settings);
  }, [defaultSettings, settings]);

  const onChange = (value: Obj) => setSettings(v => ({...v, ...value}))

  async function onUpdate() {

  }

  async function onDiscard() {
    setSettings(defaultSettings);
  }

  return <Page title={'Information settings'}>
    <Layout>
      <Layout.AnnotatedSection title={'Information settings for the store'}>
        <FormLayout>
          <TextField
            multiline={5}
            label={''}
            labelHidden
            autoComplete={'off'}
            onChange={v => onChange({informationText: v})}
            value={settings.informationText}
          />
        </FormLayout>
      </Layout.AnnotatedSection>
    </Layout>
  </Page>
}
