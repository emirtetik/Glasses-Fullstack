'use client'
import Link from 'next/link';
import React,{useState} from 'react'
import { usePathname } from 'next/navigation';
import { SearchBar } from '.';
import {FaUserAlt,FaShoppingBasket} from 'react-icons/fa'
import {CgMenuCheese} from 'react-icons/cg'
import {BiSearch} from 'react-icons/bi'
import { signOut,useSession, signIn } from 'next-auth/react';

interface NavList {
    name: string;
    href: string;
  }
const Navbar = () => {
    const pathname = usePathname();
    const [showProfile, setShowProfile] = useState(false)
    const [showNav, setShowNav] = useState(false)
    const {data:session} = useSession()
    // console.log(session?.user);
    
    const SignOut = () => {
         if(session && session.user){
           return(
            <ul className='py-5 px-1 text-gray-600'>

              <li className='hover:bg-gray-100 px-5 py-2 cursor-pointer'>{session.user.name}</li>
              <li onClick={() => signOut()} className='whitespace-nowrap hover:text-gray-900 px-5  cursor-pointer'>Sign Out</li>
              <li className="whitespace-nowrap hover:bg-gray-100 px-5 py-2 cursor-pointer">
                <a href="/addProduct">Add Product</a>
              </li>
            </ul>
           )
         }
         return (
           <ul>
             <li onClick={() => signIn()} className="whitespace-nowrap hover:bg-gray-100 px-5 py-2 cursor-pointer">Sign In</li>
           </ul>
         )
    }

    const navList: NavList[] = [
        { name: 'Mağaza', href: '/' },
        { name: 'Filter', href: '/filter' },
        { name: 'Ürünler', href: '/addProduct' },
      ];

  return (
    <>
     <div className='flex items-center justify-between py-4 relative'>
        <div className='flex items-center md:space-x-10 lg:space-x-20'>
            <div className='font-extrabold text-2xl'>Glasses</div>
            <nav className=' max-md:hidden'>
            <ul className='flex items-center lg:space-x-10 space-x-7 opacity-70 text-[15px]'>
            {navList.map((link, index) => (
          <li key={index} className='py-3 inline-block w-full'>
            <Link href={link.href}  className={pathname === link.href ? 'text-red-500 font-bold' : ''}>
                {link.name}
            </Link>
          </li>
        ))}
          </ul>
            </nav>
        </div>
           <div className='flex items-center space-x-4 '>
            <SearchBar/>
            <div onClick={() => setShowProfile(!showProfile)} className="relative cursor-pointer">
            <FaUserAlt size={20} />
            <div className={`absolute bg-white z-[2] rounded-lg shadow-lg ${showProfile ? '' : 'hidden' }`}>
              <SignOut/>
            </div>
            </div>
            <Link href={'/cart'}> 
            <div className='p-2 bg-gray-100 rounded-lg'> <FaShoppingBasket size={20} /></div>
            </Link>
            <span onClick={() => setShowNav(!showNav)} className='p-[9px] bg-gray-100 rounded-full md:hidden'>
                <CgMenuCheese size={20} className={`transition duration-300 ${showNav ? 'rotate-180' : '0'}`}/>
            </span>
           </div>
     </div>
    <div className={`md:hidden ${showNav ? 'pb-4 px-5' : 'h-0 invisible opacity-0' }`}>
          <ul className='flex flex-col text-[15px] opacity-75 px-2'>
            {navList.map((link, index) => (
              <li key={index} className='py-2'>
                <Link href={link.href} className={pathname === link.href ? 'text-red-500 font-bold' : ''}>
                  {link.name}
                </Link>
              </li>
            ))}
            {session?.user && (
  <li className='py-3 inline-block w-full'>
      <Link href="/products" className={pathname === '/addProduct' ? 'text-red-500 font-bold' : ''}>
          Ürünler
      </Link>
  </li>
)}

          </ul>
          <div className='flex items-center bg-gray-100 p-2 rounded-lg my-4 py-3'>
            <input 
            type='text'
            className='outline-none w-full bg-transparent ml-2 caret-red-500 placeholder:font-light placeholder:text-gray-500 text-[15px]'
             placeholder='Ara'
             autoComplete='false' 
             />
             <button><BiSearch size={20} className=" opacity-50"/></button>

          </div>
    </div>
    </>
  )
}

export default Navbar

