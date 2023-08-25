'use client';

import React, {useState, useCallback} from 'react'
import {TopBar as TopBarPolaris} from '@shopify/polaris'

type Props = {
  user?: null
  onNavigationToggle?: () => void;
  onLogout: () => {}
}

export const TopBar = ({user, onLogout, onNavigationToggle}: Props) => {
  const [userMenuActive, setUserMenuActive] = useState(false)
  // const [searchActive, setSearchActive] = useState(false)
  // const [searchValue, setSearchValue] = useState('')

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  )

  // const handleSearchFieldChange = useCallback((value) => {
  //     setSearchValue(value)
  //     setSearchActive(value?.length > 0)
  // }, [])

  // const handleSearchResultsDismiss = useCallback(() => {
  //     setSearchActive(false)
  //     setSearchValue('')
  // }, [])

  // const searchResultsMarkup = (
  //     <ActionList
  //         items={[
  //             { content: 'Shopify help center' },
  //             { content: 'Community forums' },
  //         ]}
  //     />
  // )

  // const searchFieldMarkup = (
  //     <TopBar.SearchField
  //         onChange={handleSearchFieldChange}
  //         value={searchValue}
  //         placeholder='Search'
  //     />
  // )

  const userMenuMarkup = (
    <TopBarPolaris.UserMenu
      name={'user name'}
      detail={'user email'}
      initials='D'
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
      actions={[
        {
          items: [
            {
              content: 'Logout',
              onAction: onLogout,
            },
          ],
        },
      ]}
    />
  )

  return <TopBarPolaris
    showNavigationToggle
    userMenu={userMenuMarkup}
    // searchResultsVisible={searchActive}
    // searchField={searchFieldMarkup}
    // searchResults={searchResultsMarkup}
    // onSearchResultsDismiss={handleSearchResultsDismiss}
    onNavigationToggle={onNavigationToggle}
  />
}
