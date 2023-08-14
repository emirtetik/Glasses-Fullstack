import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/prismadb"
import axios from "axios";
import bcrypt from "bcrypt"


export const options:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{
                    label:'email',
                    type:'text',
                    placeholder:'your email'
                },
                password: {
                    label: 'password',
                    type: 'password',
                    placeholder: 'your password'
                  }
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Please provide an email and password')
            }
            const user = await prisma.user.findUnique({
                where:{
                    email:credentials.email
                }
            })
            if (!user || !user?.password) {
                throw new Error('User not found')
            }
            const isCorrectedPassword = await bcrypt.compare(credentials.password, user.password)

            if (!isCorrectedPassword) {
                throw new Error('Invalid password')
            }
            return user
                
            }
            
        })
    ],
    pages:{
        signIn:'/signin',
        error:'/signin',
    },
    callbacks:{
        session: async ({session,token,user}) => {
             if(session?.user){
                 session.user.id = token.uid
             }
             return session
        },
        jwt:async ({user,token} ) => {
            if(user){
                token.uid = user.id
            }
            return token
        }

    },
    session:{
        strategy:'jwt'
    },
 
}