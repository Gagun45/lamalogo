import styles from './logout.module.css'
import Image from 'next/image'
import React from 'react'
import { handleLogout } from '../../../../lib/actions'

export default function Logout({ user, onClick }) {
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <span className={styles.name}>{user.name}</span>
                <span className={styles.email}>{user.email}</span>
            </div>
            <form action={handleLogout} className={styles.logout}>
                <button className={styles.button} onClick={onClick}>
                    <Image src={'/logout.png'} alt='' fill className={styles.icon} />
                </button>
            </form>
        </div>
    )
}
