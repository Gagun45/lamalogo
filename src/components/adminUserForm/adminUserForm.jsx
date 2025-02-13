'use client'

import { useActionState, useEffect, useState } from 'react'
import styles from './adminUserForm.module.css'
import React from 'react'
import { addUser } from '../../lib/actions'

export default function AdminUserForm() {
  const [state, formAction] = useActionState(addUser, undefined)

  const [username, setUsername] = useState('')
  const [img, setImg] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const resetInput = () => {
    setUsername('')
    setImg('')
    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    resetInput()
  }, [state?.success])

  // console.log(userId)

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New User</h1>
      <input type='text' placeholder='username' name='username' value={username.trim()} onChange={(e) => setUsername(e.target.value)} />
      <input type='text' placeholder='img' name='img' value={img.trim()} onChange={(e) => setImg(e.target.value)} />
      <input type='email' placeholder='email' name='email' value={email.trim()} onChange={(e) => setEmail(e.target.value)} />
      <input type='password' placeholder='password' name='password' value={password.trim()} onChange={(e) => setPassword(e.target.value)} />
      <select name='isAdmin'>
        <option value="false">Is Admin?</option>
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
      <button>Add</button>
      {state &&
        <span style={{ color: 'red' }}>{state.error}</span>}
    </form>
  )
}
