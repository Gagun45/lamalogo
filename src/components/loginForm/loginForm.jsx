'use client'

import { login } from '@/lib/actions'
import styles from './loginForm.module.css'
import { useActionState } from 'react'
import Link from 'next/link'

export default function LoginForm() {
    const [state, formAction] = useActionState(login, undefined)

    // const router = useRouter()

    // useEffect(() => {
    //     router.push('/')
    // }, [state?.success])


    return (
        <form action={formAction} className={styles.form}>
            <input type="text" placeholder="username" name="username" />
            <input type="password" placeholder="password" name="password" />
            <button>Login</button>
            {<span style={{ color: 'red' }}>{state?.error}</span>}
            <Link href="/register"> {"Have an account?"} <b>Register</b></Link>
        </form>
    )
}