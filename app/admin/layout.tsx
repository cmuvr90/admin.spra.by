'use client';

import React, {ReactNode, useCallback, useState} from 'react';
import {Frame} from '@shopify/polaris'
import {AdminMenu, TopBar} from "@/components";
import {useUser} from "@/hooks/useUser";
import {ManagerMenu} from "@/components/ManagerMenu";

export default function MainLayout({children}: {children: ReactNode}) {
  const user = useUser();
  const [navigationActive, setNavigationActive] = useState(false);

  const onNavigationToggle = useCallback(() => setNavigationActive(v => !v), [])

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
      {/*{contextualSaveBarMarkup}*/}
      {/*{loadingMarkup}*/}
      {/*{toastMarkup}*/}
      {/*{modalMarkup}*/}
      {children}
    </Frame>
  );
}
