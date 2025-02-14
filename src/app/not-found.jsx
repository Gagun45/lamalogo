'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function NotFound() {
  const router = useRouter()
  useEffect(()=>{
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000);
  })
  return (
    <div>
      <h1> 404 - Page Not Found</h1>
      <p>Redirecting to homepage in 5 seconds...</p>
    </div>
  )
}
