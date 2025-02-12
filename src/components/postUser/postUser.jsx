import { getUser } from '@/lib/data'
import styles from './postUser.module.css'
import Image from 'next/image'

// const getData = async (userId) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {cache: 'no-store'})

//     if (!res.ok) {
//       throw new Error('Failed to fetch data')
//     }

//     return res.json()
//   }

export default async function PostUser({ userId }) {
    // const user = await getData(userId)
    const user = await getUser(userId)
    return (
        <div className={styles.container}>
            {console.log(userId)}
            <Image src={user?.img ? user.img : '/noavatar.png'} alt='' width={50} height={50} className={styles.avatar} />
            <div className={styles.texts}>
                <span className={styles.title}>Author</span>
                <span className={styles.username}>{user?.username}</span>
            </div>
        </div>
    )
}
