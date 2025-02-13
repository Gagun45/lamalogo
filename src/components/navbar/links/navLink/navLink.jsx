'use client'

import React from 'react'
import styles from './navLink.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({ item }) {
    const pathname = usePathname()
    return (
            <Link href={item.path} onClick={() => setOpen(prev=>!prev)} className={`${styles.container} ${pathname == item.path && styles.active}`}>{item.title}</Link>
    )
}
