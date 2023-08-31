'use client';

import React, {useState, useCallback} from 'react'
import {TopBar as TopBarPolaris} from '@shopify/polaris'
import {User as AuthUser} from "next-auth";
import {User} from "@/services/User";

type Props = {
  user: AuthUser,
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
      name={user.role}
      detail={user.email}
      initials='D'
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
      actions={[
        {
          items: [
            {
              content: 'Logout',
              onAction: User.onLogout,
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
