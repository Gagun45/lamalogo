"use server"

import { revalidatePath } from "next/cache"
import { Post, User } from "./models"
import { connectToDb } from "./utils"
import { signIn, signOut } from "./auth"
import bcrypt from 'bcrypt'
import mongoose from "mongoose"

export const addPost = async (previousState, formData) => {
    const { title, desc, slug, userId } = Object.fromEntries(formData)

    if (!title.trim()) {
        return { error: 'Title missing' }
    }

    if (!slug.trim()) {
        return { error: 'Slug missing' }
    } else if (slug.trim().includes(' ')) {
        return { error: 'Slug cant contain spaces' }
    }

    if (!desc) {
        return { error: 'Description missing' }
    }


    try {
        connectToDb()
        const newPost = new Post({
            title,
            desc,
            slug,
            userId
        });
        await newPost.save()
        console.log("New post saved to db")
        revalidatePath('/blog')
        revalidatePath('/admin')
        return { success: Math.random().toString(36).substring(2, 9) }
    } catch (error) {
        if (error.message.includes('E11000')) {
            return { error: 'Slug already exists, change it to unique value, please' }
        }

        return { error: 'Something went wrong' }
    }

}

export const addUser = async (previousState, formData) => {
    const { username, email, password, img } = Object.fromEntries(formData)

    if (!username) {
        return { error: 'Username missing' }
    } else if (username.length < 3) {
        return { error: 'Username length must be 3 symblos at least' }
    } else if (username.length > 20) {
        return { error: 'Username cant be so long (20 symbols max)' }
    }

    if (!email) {
        return { error: 'Email missing' }
    } else if (email.length > 50) {
        return { error: "Email cant be so long (50 symbols max)" }
    }

    if (!password) {
        return { error: 'Password missing' }
    } else if (password.length < 6) {
        return { error: 'Password length must be 6 symbols at least' }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        connectToDb()
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img
        });
        await newUser.save()
        console.log("New user saved to db")
        revalidatePath('/admin')
        return { success: Math.random().toString(36).substring(2, 9) }
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }

}

export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData)

    try {
        connectToDb()
        await Post.findByIdAndDelete(id)
        console.log("Post deleted from db")
        revalidatePath('/blog')
        revalidatePath('/admin')
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong')
    }

}

export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData)

    try {
        connectToDb()
        await Post.deleteMany({ userId: id })
        await User.findByIdAndDelete(id)
        console.log("User deleted from db")
        revalidatePath('/admin')
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong')
    }

}

export const updateAdmin = async (formData) => {

    const { id, isAdmin } = Object.fromEntries(formData)

    try {
        connectToDb()
        const newUser =
            await User.findOneAndUpdate({
                _id: new mongoose.Types.ObjectId(id)
            },
                { $set: { isAdmin: isAdmin } },
                { new: true })
        if (newUser) {
            console.log("User`s ADMINNIN has been changed")
        } else {
            console.log('User not found')
        }
        revalidatePath('admin')
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong')
    }

}

export const handleGithubLogin = async () => {
    'use server'
    await signIn('github')
}

export const handleLogout = async () => {
    'use server'
    await signOut()
}

export const register = async (previousState, formData) => {


    const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData)
    // const newData = {username, password, email, passwordRepeat}

    // console.log("newData: ", newData)
    if (!username) {
        return { error: 'Username missing' }
    } else if (username.length < 3) {
        return { error: 'Username length must be 3 symblos at least' }
    } else if (username.length > 20) {
        return { error: 'Username cant be so long (20 symbols max)' }
    }
    if (!email) {
        return { error: 'Email missing' }
    } else if (email.length > 50) {
        return { error: "Email cant be so long (50 symbols max)" }
    }

    if (!password) {
        return { error: 'Password missing' }
    } else if (password.length < 6) {
        return { error: 'Password length must be 6 symbols at least' }
    }

    if (password !== passwordRepeat) return { error: "Passwords dont match" }

    try {
        connectToDb()

        const user = await User.findOne({ username })

        if (user) return { error: 'Username already taken' }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
        })

        await newUser.save()
        console.log('Saved to db')

        return { success: true }
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }
}


export const login = async (previousState, formData) => {
    const { username, password } = Object.fromEntries(formData)

    try {
        await signIn('credentials', { username, password })
    } catch (error) {
        console.log(error)
        if (error.message.includes("credentialssignin")) {
            return { error: "Invalid username or password" }
        }
        throw error
    }
}
