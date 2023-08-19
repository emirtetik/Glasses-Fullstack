import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
// import {AiOutLineHeart} from 'react-icons/ai'
import prisma from '@/app/prismadb'

const Item = async ()  => {
const products = await prisma.product.findMany({})
console.log(products);

if(products.length === 0){
    return (
        <div>
         bos
        </div>
    )
}
  return (
    <div>
         <h1 className='py-3 text-xl '>Glasses</h1>
         <div className="gird lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  md:gap-20 gap-12" ></div>
           {products.map((product) => (
            <div key={product.id} > 
                           <Link href={`/dashboard/${product.id}`}>
                            <div className='relative rounded-lg'>
                                <Image src={product.images.split(',')[0]} width={250} height={300} alt='product'/>
                            </div>
                            <div className='flex justify-between mt-4 items-center'>
                                <div >
                                    <h1 className='text-[14px] font-medium max-w-[150px] whitespace-nowrap overflow-hidden'>{product.title}</h1>
                                    <p className='text-[13px] opacity-60'>{product.store}</p>
                                </div>
                                <span className='px-2 font-medium bg-gray-100 rounded-lg'>₺{product.price}</span>
                            </div>
                           </Link>
            </div>
           ))}
      
    </div>
  )
}

export default Item
