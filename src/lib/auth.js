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
            authorization: { params: { scope: "read:user user:email" } },
            async profile(profile) {
                connectToDb()

                const user = await User.findOne({ email: profile.email })

                if (!user) {
                    const newUser = new User({
                        username: profile?.login,
                        email: profile?.email,
                        image: profile?.avatar_url,
                        isAdmin: false
                    })
                    await newUser.save()
                }

                const ghuser = await User.findOne({ email: profile.email })

                console.log('db user: ', user)
                console.log('db ghuser: ', ghuser)
                console.log('db profile: ', profile)

                if (ghuser) {
                    return {
                        isAdmin: ghuser.isAdmin,
                        dbID: ghuser.id,
                        username: ghuser.username,
                        email: ghuser.email
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
        async signIn({ account, profile }) {
            if (account?.provider === 'github') {
                connectToDb()
                try {
                    const user = await User.findOne({ email: profile?.email })
                    if (!user) {
                        const newUser = new User({
                            username: profile?.login,
                            email: profile?.email,
                            image: profile?.avatar_url,
                            isAdmin: false
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