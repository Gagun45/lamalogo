'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function NotFound() {
  const router = useRouter()
  const initialTime = 5
  const [countdown, setCountdown] = useState(initialTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    const timeout = setTimeout(() => {
      router.push('/')
    }, initialTime * 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [router]
  )


  return (
    <div>
      <h1> 404 - Page Not Found</h1>
      <p>Redirecting to homepage in {countdown} seconds...</p>
    </div>
  )
}
