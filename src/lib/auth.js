import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectToDb } from "./utils"
import { User } from "./models"
import bcrypt from 'bcrypt'
import { authConfig } from "./auth.config"

const login = async (credentials) => {
    try {
        connectToDb()
        const user = await User.findOne({ username: credentials.username })

        if (!user) {
            throw new Error("Wrong credentials")
        }
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordCorrect) {
            throw new Error("Wrong credentials")
        }
        return user

    } catch (error) {
        console.log(error)
        throw new Error("Failed to login")
    }
}

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Github({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            async profile(profile) {
                const user = await User.findOne({email: profile.email})

                if (user) {
                    return {
                        isAdmin: user.isAdmin,
                        dbID: user.id,
                        email: user.email
                    }
                } else {
                    return null
                }
            }
        }),
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials)
                    return user

                } catch (error) {
                    console.log(error)
                    return null
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === 'github') {
                console.log(user)
                connectToDb()
                try {
                    const user = await User.findOne({ email: profile.email })
                    if (!user) {
                        const newUser = new User({
                            username: profile.login,
                            email: profile.email,
                            image: profile.avatar_url,
                            isAdmin: true
                        })
                        await newUser.save()
                    }
                } catch (error) {
                    console.log(error)
                    return false
                }
            }
            return true
        },
        ...authConfig.callbacks,
    }
})