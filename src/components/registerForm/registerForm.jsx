'use client'

import { register } from '@/lib/actions'
import styles from './registerForm.module.css'
import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterForm() {
    const [state, formAction] = useActionState(register, undefined)

    const router = useRouter()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')

    useEffect(() => {
        state?.success && router.push('/login')
    }, [state?.success, router])

    return (
        <form action={formAction} className={styles.form}>
            <input type="text" placeholder="username" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} />
            <input type="email" placeholder="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <input type="password" placeholder="password again" name="passwordRepeat" value={passwordRepeat} onChange={(e)=>setPasswordRepeat(e.target.value)}/>
            <button>Register</button>
            {<span style={{color: 'red'}}>{state?.error}</span>}
            <Link href="/login">Have an account? <b>Login</b></Link>
        </form>
    )
}
