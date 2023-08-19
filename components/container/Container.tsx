import Link from 'next/link'
import React from 'react'
import { Filter, Item } from '..'

const Container = () => {
  return (
    <div className='mb-[200px]'>
    <div className='flex'>
      <Link href="/filters" className='opacity-70'>
       <div>
        <Filter/>
       </div>
      </Link>
       <div className='px-20'>
            <Item/>
       </div>
    </div>
    </div>
  )
}

export default Container
