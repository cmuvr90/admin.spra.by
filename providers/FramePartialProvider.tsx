'use client';

import React, {ReactNode} from 'react'
import {Frame} from '@shopify/polaris'

export const FramePartialProvider = ({children}: {children: ReactNode}) => {
  return <Frame>
    {children}
  </Frame>
}
