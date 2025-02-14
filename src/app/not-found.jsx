'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function NotFound() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)
  useEffect(() => {
    const interval = setInterval(() => {

    }, 1000)
  }, []
  )

  useEffect(()=>{
    if (countdown==0) {
      router.push('/')
    }
  }, [countdown])

  return (
    <div>
      <h1> 404 - Page Not Found</h1>
      <p>Redirecting to homepage in 5 seconds...</p>
    </div>
  )
}
