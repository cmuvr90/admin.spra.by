'use client';

import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import {ContextualSaveBar, Frame, Loading} from '@shopify/polaris'
import {AdminMenu, TopBar} from "@/components";
import {ManagerMenu} from "@/components/ManagerMenu";
import {useSelector} from "react-redux";
import {Storage} from "@/redux/store";
import {useTopBar, useUser} from "@/hooks";
import {usePathname, useSearchParams} from "next/navigation";
import {User} from "@/services/User";

export default function MainLayout({children}: { children: ReactNode }) {
  const topBarHook = useTopBar();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const user = useUser();
  const [navigationActive, setNavigationActive] = useState(false);
  const onNavigationToggle = useCallback(() => setNavigationActive(v => !v), [])

  const loading = useSelector((state: Storage) => state.layout.loading)
  const topBar = useSelector((state: Storage) => state.layout.topBar)

  const loadingMarkup = loading ? <Loading/> : null

  const contextualSaveBarMarkup = topBar.active ? <ContextualSaveBar
    message={topBar.title}
    saveAction={topBar.saveAction}
    discardAction={topBar.discardAction}
    alignContentFlush={topBar.alignContentFlush}
    fullWidth={topBar.fullWidth}
    contextControl={topBar.contextControl}
    secondaryMenu={topBar.secondaryMenu}
  /> : null

  useEffect(() => {
    topBarHook.active(false);
  }, [pathName, searchParams]);

  /**
   *
   */
  const logo = {
    width: 50,
    topBarSource: 'https://sun6-22.userapi.com/s/v1/if1/1L7AV_Vxv9WBrLRZg8_FmtqF_gZxJEraUrkwioEm72UMNxebDmSqy6BUzyAxYBET1ie1GcUq.jpg?size=100x100&quality=96&crop=0,0,500,500&ava=1',
    // contextualSaveBarSource: 'https://sun6-22.userapi.com/s/v1/if1/1L7AV_Vxv9WBrLRZg8_FmtqF_gZxJEraUrkwioEm72UMNxebDmSqy6BUzyAxYBET1ie1GcUq.jpg?size=100x100&quality=96&crop=0,0,500,500&ava=1',
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
      navigation={User.isAdmin(user.role) ? <AdminMenu/> : <ManagerMenu/>}
      showMobileNavigation={navigationActive}
      onNavigationDismiss={onNavigationToggle}
    >
      {loadingMarkup}
      {contextualSaveBarMarkup}
      {/*{toastMarkup}*/}
      {/*{modalMarkup}*/}
      {children}
    </Frame>
  );
}
