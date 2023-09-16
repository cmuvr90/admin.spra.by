'use client';

import React from 'react'
import {Navigation} from '@shopify/polaris'
import {HomeMajor, ProductsMajor} from '@shopify/polaris-icons'
import {usePathname} from "next/navigation";

if (typeof window === 'undefined') React.useLayoutEffect = React.useEffect  //hot fix

export const ManagerMenu = () => {
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
          label: 'Products',
          icon: ProductsMajor,
          url: '/admin/products',
        },
      ]}
    />
  </Navigation>
}
