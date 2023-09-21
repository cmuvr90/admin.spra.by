'use client';

import React, {useEffect, useState} from 'react'
import {FormLayout, TextField} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {useMessage, useSaveBar} from "@/hooks";
import {updateInformation} from "@/serverActions/settings";

export const InformationSettings = ({information: informationData}: Props) => {
  const toast = useMessage();
  const saveBar = useSaveBar(onUpdate, onDiscard);
  const [information, setInformation] = useState(informationData);
  const [defaultInformation, setDefaultInformation] = useState(informationData);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    saveBar.onChange(defaultInformation, information);
  }, [defaultInformation, information]);

  async function onUpdate() {
    setDisabled(true);
    try {
      const data = await updateInformation(information);
      if (!data) throw Error('Error');
      setDefaultInformation(data.information);
      toast.info('Saved');
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
    setDisabled(false);
  }

  async function onDiscard() {
    setInformation(defaultInformation);
  }

  return <FormLayout>
    <TextField
      disabled={disabled}
      multiline={5}
      label={'Information settings for the store'}
      autoComplete={'off'}
      onChange={setInformation}
      value={information}
    />
  </FormLayout>
}

type Props = {
  information: string;
}