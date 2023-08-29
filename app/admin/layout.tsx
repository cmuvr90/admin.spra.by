'use client';

import React, {ReactNode, useCallback, useState} from 'react';
import {Frame, Loading} from '@shopify/polaris'
import {AdminMenu, TopBar} from "@/components";
import {ManagerMenu} from "@/components/ManagerMenu";
import {useSelector} from "react-redux";
import {Storage} from "@/redux/store";
import {useUser} from "@/hooks";

export default function MainLayout({children}: {children: ReactNode}) {
  const user = useUser();
  const [navigationActive, setNavigationActive] = useState(false);

  const onNavigationToggle = useCallback(() => setNavigationActive(v => !v), [])

  const loading = useSelector((state: Storage) => state.layout.loading)

  const loadingMarkup = loading ? <Loading/> : null

  /**
   *
   */
  const logo = {
    width: 50,
    topBarSource: 'https://sun6-22.userapi.com/s/v1/if1/1L7AV_Vxv9WBrLRZg8_FmtqF_gZxJEraUrkwioEm72UMNxebDmSqy6BUzyAxYBET1ie1GcUq.jpg?size=100x100&quality=96&crop=0,0,500,500&ava=1',
    contextualSaveBarSource: 'https://sun6-22.userapi.com/s/v1/if1/1L7AV_Vxv9WBrLRZg8_FmtqF_gZxJEraUrkwioEm72UMNxebDmSqy6BUzyAxYBET1ie1GcUq.jpg?size=100x100&quality=96&crop=0,0,500,500&ava=1',
    url: 'http://localhost:3001/',
    accessibilityLabel: 'SPRABY',
  }

  return user && (
    <Frame
      logo={logo}
      topBar={
        <TopBar
          user={user}
          onNavigationToggle={onNavigationToggle}
        />
      }
      navigation={user.isAdmin() ? <AdminMenu/> : <ManagerMenu/>}
      showMobileNavigation={navigationActive}
      onNavigationDismiss={onNavigationToggle}
    >
      {loadingMarkup}
      {/*{contextualSaveBarMarkup}*/}
      {/*{toastMarkup}*/}
      {/*{modalMarkup}*/}
      {children}
    </Frame>
  );
}
