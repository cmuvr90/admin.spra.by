'use client';

import React, {useState, useCallback} from 'react'
import {TopBar as TopBarPolaris} from '@shopify/polaris'
import {User} from "@/services/User";

type Props = {
  user: User | null,
  onNavigationToggle?: () => void;
}

export const TopBar = ({user, onNavigationToggle}: Props) => {
  const [userMenuActive, setUserMenuActive] = useState(false)

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  )

  const userMenuMarkup = user && (
    <TopBarPolaris.UserMenu
      name={user.getRole()}
      detail={user.getEmail()}
      initials='D'
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
      actions={[
        {
          items: [
            {
              content: 'Logout',
              onAction: user.onLogout,
            },
          ],
        },
      ]}
    />
  )

  return <TopBarPolaris
    showNavigationToggle
    userMenu={userMenuMarkup}
    onNavigationToggle={onNavigationToggle}
  />
}
