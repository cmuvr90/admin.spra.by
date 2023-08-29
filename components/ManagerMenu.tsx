import React from 'react'
import {Navigation} from '@shopify/polaris'
import {HomeMajor, ProductsMajor} from '@shopify/polaris-icons'
import {usePathname} from "next/navigation";

export const ManagerMenu = () => {
  const path = usePathname();

  return <Navigation location={path ?? ''}>
    <Navigation.Section
      items={[
        {
          label: 'Dashboard',
          icon: HomeMajor,
          url: '/dashboard',
        },
        {
          label: 'Products',
          icon: ProductsMajor,
          url: '/products',
        },
      ]}
    />
  </Navigation>
}
