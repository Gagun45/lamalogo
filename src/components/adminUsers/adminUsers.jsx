import { getUsers } from '@/lib/data'
import styles from './adminUsers.module.css'
import { deleteUser, updateAdmin } from '@/lib/actions'
import Image from 'next/image'

export default async function AdminUsers() {
  const users = await getUsers()

  return (
    <div className={styles.container}>
      <h1>Users</h1>
      {
        users.map(user => (
          <div className={styles.user} key={user.id}>
            <div className={styles.detail}>
              <Image src={user.img || '/noavatar.png'} alt='' width={50} height={50} />
              <div className={styles.detailTexts}>
                <span>Username: {user.username}</span>
                <span>ID: {user.id}</span>
                <span>Status: <span style={{ color: user.isAdmin ? "green" : 'aqua' }}><b>{user.isAdmin ? 'ADMIN' : 'CLIENT'}</b></span></span>
              </div>
            </div>
            <div className={styles.forms}>
              <form action={deleteUser}>
                <input type="hidden" name='id' value={user.id} />
                <button className={`${styles.userButton} ${styles.deleteButton}`}>Delete the user</button>
              </form>
              <form action={updateAdmin}>
                <input type="hidden" name='id' value={user.id} />
                <input type='hidden' name='isAdmin' value={!user.isAdmin} />
                <button className={`${styles.userButton} ${styles.updateButton}`}>{user.isAdmin ? 'Change to client' : 'Change to admin'}</button>
              </form>
            </div>
          </div>
        ))
      }
    </div>
  )
}
