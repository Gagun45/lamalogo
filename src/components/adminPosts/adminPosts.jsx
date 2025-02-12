import { getPosts, getUsers } from '@/lib/data'
import styles from './adminPosts.module.css'
import Image from 'next/image'
import { deletePost } from '@/lib/actions'
import Link from 'next/link'

export default async function AdminPosts() {
  const posts = await getPosts()
  const users = await getUsers()

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {
        posts.map(post => {
          const user = users.find(user => user.id.toString() == post.userId)

          return (
            <div className={styles.post} key={post.id}>
              <div className={styles.detail}>
                <Image src={post.img || '/noavatar.png'} alt='' width={50} height={50} />
                <div className={styles.detailTexts}>
                  <Link href={`/blog/${post.slug}`}>
                    <span className={styles.postTitle}>{post.title}</span>
                  </Link>
                  <span>Author: {user?.username || 'unknown'} <span style={{ color: user.isAdmin ? "green" : 'aqua' }}><i>({user?.isAdmin ? "admin" : 'client'})</i></span></span>
                  <span><i><small>Posted at: {post.createdAt.toString().slice(4, 16)}</small></i></span>
                </div>
              </div>
              <div className={styles.forms}>
                <form action={deletePost}>
                  <input type="hidden" name='id' value={post.id} />
                  <button className={`${styles.postButton} ${styles.deleteButton}`}>Delete the post</button>
                </form>
              </div>
            </div>
          )
        }
        )
      }
    </div>
  )
}