'use client';

import React, {useState} from 'react'
import {Button, FormLayout, TextField} from '@shopify/polaris'
import {useMessage} from "@/hooks";

export const LoginForm = ({onSend}: Props) => {
  const toast = useMessage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const _onSend = async () => {
    if (onSend) onSend({email, password});
  }

  return <FormLayout>
    <TextField
      id={'email'}
      label={''}
      labelHidden
      placeholder='Email'
      type={'email'}
      onChange={setEmail}
      autoComplete='off'
      value={email}
    />
    <TextField
      id={'password'}
      label={''}
      labelHidden
      placeholder='Password'
      type={'password'}
      onChange={setPassword}
      autoComplete='off'
      value={password}
    />
    <Button onClick={_onSend} primary fullWidth loading={loading}>Login</Button>
  </FormLayout>
}

type Props = {
  onSend?: ({email, password}: {email: string, password: string}) => void;
}
