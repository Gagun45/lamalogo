import { Post, User } from "./models"
import { connectToDb } from "./utils"
import { unstable_noStore as NoStore } from "next/cache"
// const users = [
//     { id: 1, name: "John" },
//     { id: 2, name: "Weak" }
// ]


// const posts = [
//     { id: 1, title: "Post 1", body: 'qweqwe', userId: 1 },
//     { id: 2, title: "Post 2", body: 'qweqwe', userId: 1 },
//     { id: 3, title: "Post 3", body: 'qweqwe', userId: 2 },
//     { id: 4, title: "Post 4", body: 'qweqwe', userId: 2 },

// ]

export const getPosts = async () => {
    try {
        connectToDb()
        const posts = await Post.find()

        return posts

    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch posts!')
    }
}

export const getPost = async (slug) => {
    try {
        connectToDb()
        const post = await Post.findOne({ slug })
        return post
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch the post!')
    }
}

export const getUser = async (id) => {
    NoStore()
    try {
        connectToDb()
        const user = await User.findById(id)
        return user
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch the user!')
    }
}

export const getUsers = async () => {
    try {
        connectToDb()
        const users = await User.find()
        return users
    } catch (err) {
        console.log(err)
        throw new Error('Failed to fetch the user!')
    }
}