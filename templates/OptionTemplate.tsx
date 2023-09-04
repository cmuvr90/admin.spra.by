'use client';

import React, {useEffect, useState} from 'react'
import {
  Card,
  FormLayout,
  Layout,
  Page,
  PageActions,
  TextField
} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {useMessage, useSaveBar} from "@/hooks";
import {useRouter} from "next/navigation";
import {useConfirm} from "@/hooks/useConfirm";
import {Obj} from "@/services/types";
import {Option as OptionInterface} from "@/services/types/Option";
import {Option} from "@/services/Option";
import {createOption, deleteOption, updateOption} from "@/serverActions/option";

export const OptionTemplate = ({option: optionData}: Props) => {
  const router = useRouter();
  const confirm = useConfirm()
  const saveBar = useSaveBar(
    !!optionData?.id ? onUpdate : onCreate,
    onDiscard,
    {
      primaryContent: !!optionData?.id ? 'Save' : 'Create', secondaryContent: 'Discard'
    }
  );
  const toast = useMessage();

  const [defaultOption, setDefaultOption] = useState(optionData);
  const [option, setOption] = useState(optionData);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({});

  const onChange = (value: Obj) => setOption((option: OptionInterface) => ({...option, ...value}))

  useEffect(() => {
    const isEqual = saveBar.onChange(Option.getData(defaultOption), Option.getData(option));
    if (isEqual) setErrors({});
  }, [option, defaultOption])

  async function onDiscard() {
    setErrors({});
    setOption(defaultOption);
  }

  async function onUpdate() {
    const optionData = Option.getData(option);
    const {errors} = Option.validate(optionData);
    setErrors(errors ?? {});

    if (!errors) {
      setDisabled(true);
      try {
        const data = await updateOption(optionData);
        if (!data) throw Error('Error');

        setDefaultOption(data);
        toast.info('Saved');
      } catch (e) {
        toast.error((e as Error).message || 'error')
      }
      setDisabled(false);
    }
  }

  async function onCreate() {
    const optionData = Option.getData(option);
    const {errors} = Option.validate(optionData);
    setErrors(errors ?? {});

    if (!errors) {
      setDisabled(true);
      try {
        const data = await createOption(optionData);
        if (data) {
          setDefaultOption(data);
          setOption(data);
          router.replace(`/admin/options/${data.id}`)
        }
        toast.info('Created');
      } catch (e) {
        toast.error((e as Error).message || 'error')
      }
      setDisabled(false);
    }
  }

  async function onDelete(id: string) {
    try {
      setDisabled(true);
      const data = await deleteOption(id);
      toast.info('Deleted');
      router.push(`/admin/options`);
    } catch (e) {
      toast.error((e as Error).message || 'error')
      setDisabled(false);
    }
  }

  return <Page title={defaultOption.name}>
    <Layout>
      <Layout.Section>
        <Card>
          <FormLayout>
            <TextField
              autoComplete={'off'}
              label={'Name'}
              value={option.name}
              multiline
              error={errors?.name}
              onChange={name => onChange({name})}
              disabled={disabled}
            />
            <TextField
              autoComplete={'off'}
              label={'Title'}
              value={option.title}
              multiline
              error={errors?.title}
              onChange={title => onChange({title})}
              disabled={disabled}
            />
            <TextField
              autoComplete={'off'}
              label={'Description'}
              value={option.description}
              multiline
              error={errors?.description}
              onChange={description => onChange({description})}
              disabled={disabled}
            />
          </FormLayout>
        </Card>
      </Layout.Section>
      {
        !!option?.id &&
        <Layout.Section>
          <PageActions
            secondaryActions={[{
              content: 'Delete',
              destructive: true,
              disabled: disabled,
              onAction: () => {confirm.open(() => onDelete(option?.id ?? ''))},
            }]}
          />
        </Layout.Section>
      }
    </Layout>
  </Page>
}

type Props = {
  option: OptionInterface,
}
