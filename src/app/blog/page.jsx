import PostCard from '@/components/postCard/postCard'
import styles from './blog.module.css'
import { getPosts } from '@/lib/data'

// const getData = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts')

//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }

//   return res.json()
// }

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
