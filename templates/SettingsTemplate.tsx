'use client';

import React, {useEffect, useMemo, useState} from 'react'
import {LegacyCard, Page, Tabs} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {InformationSettings} from "@/components/InformationSettings";
import {Settings} from "@/services/types/Settings";
import {getSettings} from "@/serverActions/settings";
import {useMessage} from "@/hooks";

const IDS = {
  INFORMATION: 'information',
  DELIVERY: 'delivery',
  PAYMENT: 'payment'
}

const TABS = [
  {
    id: IDS.INFORMATION,
    content: 'Information',
  },
  {
    id: IDS.DELIVERY,
    content: 'Delivery',
  },
  {
    id: IDS.PAYMENT,
    content: 'Payment',
  }
];

export const SettingsTemplate = () => {
  const toast = useMessage();
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    information: ''
  });

  useEffect(() => {
    onGetSettings().then();
  }, [])

  const currentTab = useMemo(() => TABS[selected], [selected]);

  async function onGetSettings() {
    setLoading(true);
    try {
      const data = await getSettings();
      if (!data) throw Error('Error');
      setSettings(data);
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
    setLoading(false);
  }

  return <Page title={'Settings'}>
    <LegacyCard>
      <Tabs disabled={loading} tabs={TABS} selected={selected} onSelect={setSelected}>
        <LegacyCard.Section>
          {
            (IDS.INFORMATION === currentTab.id && !loading) && <InformationSettings information={settings.information}/>
          }
          {
            IDS.DELIVERY === currentTab.id && <div>//delivery</div>
          }
          {
            IDS.PAYMENT === currentTab.id && <div>//payment</div>
          }
        </LegacyCard.Section>
      </Tabs>
    </LegacyCard>
  </Page>
}