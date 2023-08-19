import NextAuth from "next-auth"
import {options} from "./options"

const nextAuthUrl = process.env.NEXTAUTH_URL;
options.secret = process.env.NEXTAUTH_SECRET;

const handler = NextAuth(options)

export {handler as GET, handler as POST}