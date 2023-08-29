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

export const AdminMenu = ({}) => {
  const path = usePathname();

  return <Navigation location={!!path?.length && path !== '/admin' ? path : '/admin/dashboard'}>
    <Navigation.Section
      items={[
        {
          label: 'Dashboard',
          icon: HomeMajor,
          url: '/admin/dashboard',
        },
        {
          label: 'Users',
          icon: CustomersMajor,
          url: '/admin/users',
        },
        {
          label: 'Brands',
          icon: InventoryMajor,
          url: '/admin/brands',
        },
        {
          label: 'Categories',
          icon: CategoriesMajor,
          url: '/admin/categories',
        },
        {
          label: 'Collections',
          icon: CollectionsMajor,
          url: '/admin/collections',
        },
        {
          label: 'Options',
          icon: TroubleshootMajor,
          url: '/admin/options',
        },
        {
          label: 'Navigations',
          icon: NavigationMajor,
          url: '/admin/navigations',
        },
      ]}
    />
  </Navigation>
}
