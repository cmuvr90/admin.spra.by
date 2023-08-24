import React from 'react'
import {Navigation} from '@shopify/polaris'
import {
  HomeMajor,
  NavigationMajor,
  CustomersMajor,
  InventoryMajor,
  CategoriesMajor,
  CollectionsMajor,
  TroubleshootMajor,
} from '@shopify/polaris-icons'
import {usePathname} from "next/navigation";

if (typeof window === 'undefined') React.useLayoutEffect = React.useEffect  //hot fix

export const AdminMenu = ({}) => {
  const path = usePathname();

  return <Navigation location={path}>
    <Navigation.Section
      items={[
        {
          label: 'Dashboard',
          icon: HomeMajor,
          url: '/dashboard',
        },
        {
          label: 'Users',
          icon: CustomersMajor,
          url: '/users',
        },
        {
          label: 'Brands',
          icon: InventoryMajor,
          url: '/brands',
        },
        {
          label: 'Categories',
          icon: CategoriesMajor,
          url: '/categories',
        },
        {
          label: 'Collections',
          icon: CollectionsMajor,
          url: '/collections',
        },
        {
          label: 'Options',
          icon: TroubleshootMajor,
          url: '/options',
        },
        {
          label: 'Navigations',
          icon: NavigationMajor,
          url: '/navigations',
        },
      ]}
    />
  </Navigation>
}
