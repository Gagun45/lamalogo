import { auth } from '@/lib/auth';
import PostCard from '../../components/postCard/postCard'
import { getPosts } from '../../lib/data'
import styles from './blog.module.css'
import React from 'react'
import UserPostForm from '@/components/userPostForm/userPostForm';

// const getData = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts')

//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }

//   return res.json()
// }

export const metadata = {
  title: "Blog Page",
  description: "Blog description",
};

export default async function BlogPage() {
  // const posts = await getData()
  const posts = await getPosts()
  const session = await auth()

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <UserPostForm userId={session.dbID} />
      </div>
      <div className={styles.postsWrapper}>
        <h1>Posts</h1>
        {posts.length > 0 ?
          (
            <div className={styles.postsContainer}>
              {posts.map(post => (
                <div className={styles.post} key={post.id}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          ) : (<div>No posts yet</div>)

        }
      </div>

    </div>
  )
}
