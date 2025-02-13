'use client'

import { useActionState, useEffect, useState } from 'react'
import styles from './adminPostForm.module.css'
import React from 'react'
import { addPost } from '../../lib/actions'

export default function AdminPostForm({ userId }) {
  const [state, formAction] = useActionState(addPost, undefined)

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [img, setImg] = useState('')
  const [description, setDescription] = useState('')

  const resetInput = () => {
    setTitle('')
    setSlug('')
    setImg('')
    setDescription('')
  }

  useEffect(() => {
    resetInput()
  }, [state?.success])

  // console.log(userId)

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New Post</h1>
      <input type='text' placeholder='title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type='text' placeholder='slug' name='slug' value={slug} onChange={(e) => setSlug(e.target.value)} />
      <input type='text' placeholder='img' name='img' value={img} onChange={(e) => setImg(e.target.value)} />
      <input type='hidden' name='userId' value={userId} />
      <textarea placeholder='Description' name='desc' rows={10} value={description} onChange={(e) => setDescription(e.target.value)} />
      <button>Add</button>
      {state &&
        <span style={{ color: 'red' }}>{state.error}</span>}
    </form>
  )
}
