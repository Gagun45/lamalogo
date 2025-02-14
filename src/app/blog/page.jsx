import PostCard from '../../components/postCard/postCard'
import { getPosts } from '../../lib/data'
import styles from './blog.module.css'
import React from 'react'

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
  return (
    <div className={styles.container}>
      {posts.length > 0 ?
        posts.map(post => (
          <div className={styles.post} key={post.id}>
            <PostCard post={post} />
          </div>
        )) : (<div>No posts yet</div>)
      }

    </div>
  )
}
