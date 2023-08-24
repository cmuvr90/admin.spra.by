import {LinkLikeComponentProps} from "@shopify/polaris/build/ts/src/utilities/link";
import React from 'react'
import Link from 'next/link';

export const NextLink = ({url, children, ...rest}: LinkLikeComponentProps) => {
  // @ts-ignore
  return <Link href={url} {...rest}>
    {children}
  </Link>
}

