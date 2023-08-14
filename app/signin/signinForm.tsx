'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';
import {signIn} from 'next-auth/react'
const SigninForm = () => {
    const { data: session } = useSession();
     const router = useRouter()
      const [user, setUser] = useState({
     email:'',
     password: ''
             })
             const Login = async () => {
                try {
                    const result = await signIn('credentials', {
                        email: user.email,
                        password: user.password,
                        redirect: true,
                        callbackUrl: '/',
                    });
                    console.log("Sign In Result:", result);
                } catch (error) {
                    console.error("Sign In Error:", error);
                }
            };
  return (
    <div className='flex flex-col items-center justify-center min-h-screen  py-2'>
    <div className="p-10 rounded-lg shadow-lg flex flex-col ">
        <h1 className='text-xl font-medium mb-4'>Giriş Yap</h1>
      
<label htmlFor="" className='mb-2'>Email</label>
       <input type="text" className='p-2 border-gray-400 border-[1px] rounded-lg mb-4 '  
        id='email'
        value={user.email}
        placeholder='email'
        onChange={(e) => setUser({...user, email:e.target.value})}
       />

<label htmlFor="" className='mb-2'>Password</label>
       <input type="password" className='p-2 border-gray-400 border-[1px] rounded-lg mb-4 '  
        id='password'
        value={user.password}
        placeholder='password'
        onChange={(e) => setUser({...user, password:e.target.value})}
       />

       <button 
        onClick={Login}
       className='p-2 border bg-purple-600 text-white border-gray-400 mt-2 mb-4 '>
           Giriş
       </button>
       {session ? (
          <p className="text-green-500">Oturum açma işlemi başarılı. Kullanıcı: {session.user.name}</p>
        ) : (
          <p className="text-red-500">Oturum açma işlemi başarısız oldu.</p>
        )}
       <Link href="/signin" 
       className='text-sm  text-center mt-5 text-neutral-600'>
           Already have an account?
       </Link>
       <Link href={"/"} className='text-center mt-2'></Link>
    </div>
    
</div>
  )
}

export default SigninForm