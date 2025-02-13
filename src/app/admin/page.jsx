import { Suspense } from 'react'
import styles from './admin.module.css'
import AdminPosts from '@/components/adminPosts/adminPosts'
import AdminPostForm from '@/components/adminPostForm/adminPostForm'
import AdminUsers from '@/components/adminUsers/adminUsers'
import AdminUserForm from '@/components/adminUserForm/adminUserForm'
import { auth } from '@/lib/auth'

export default async function AdminPage() {
  const session = await auth()
  return (
    <div className={styles.container}>
      <div className={`${styles.cell} ${styles.border}`}>

        <Suspense fallback={<div>Loading...</div>}>
          <AdminPosts />
        </Suspense>
      </div>
      <div className={`${styles.cell}`}>
        <AdminPostForm userId={session.dbID} />
      </div>

      <div className={`${styles.cell} ${styles.border}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AdminUsers />
        </Suspense>
      </div>
      <div className={`${styles.cell}`}>
        <AdminUserForm />
      </div>
    </div >
  )
}
