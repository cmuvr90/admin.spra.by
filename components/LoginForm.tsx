'use client';

import React, {useState} from 'react'
import {Button, FormLayout, TextField} from '@shopify/polaris'
import {signIn, SignInResponse} from "next-auth/react";

export const LoginForm = ({onSend}: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    setLoading(true);
    const response = await signIn('credentials', {email, password, redirect: false, callbackUrl: '/admin'});
    if (typeof onSend === 'function') await onSend(response);
    setLoading(false);
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
    <Button onClick={onLogin} primary fullWidth loading={loading}>Login</Button>
  </FormLayout>
}

type Props = {
  onSend?: (params?: SignInResponse) => Promise<void>;
}
