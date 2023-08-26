'use client';

import React, {ReactNode} from 'react'
import {Frame, Toast} from '@shopify/polaris'
import {useDispatch, useSelector} from "react-redux";
import {onChangeMessage} from "@/redux/actions/layoutActions";
import {Storage} from "@/redux/store";

export const FramePartialProvider = ({children}: {children: ReactNode}) => {
  const dispatch = useDispatch();

  const message = useSelector((state: Storage) => state.layout.message)

  const toastMarkup = message ? message.content.map(i =>
    <Toast key={i} {...message} content={i} onDismiss={() => dispatch(onChangeMessage())}/>,
  ) : null

  return <Frame>
    {toastMarkup}
    {children}
  </Frame>
}
