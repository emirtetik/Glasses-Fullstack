'use client'
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {signIn, signOut, useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Color, ImageUpload, Para, Size } from '@/components'

const Productform = () => {
    const {data:session} = useSession()
    const id = session?.user.id
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        style: '',
        size: '',
        inventory: '',
        color: '',  
        price:0,
        images: '',
        userId: id,
        store:''

    })
   
    const [describe, setDescribe] = useState<string>('')
    const [info, setInfo] = useState<any>()
    const [image, setImage] = useState<string[]>([])

 

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
   const {name,value} = e.target
    setFormData({...formData,[name]:value})   

  }
  const handlePriceChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.name === 'price' ? parseInt(e.target.value):parseInt(e.target.value)
    const inventory = e.target.name === 'inventory' ? parseInt(e.target.value):parseInt(e.target.value)
       
      setFormData({...formData,[e.target.name]:value}),
      setFormData({...formData,[e.target.name]:inventory})
   }

   const handleImageChange = () => {
    const imagesString = JSON.stringify(image);
    setFormData((prevData) => ({
      ...prevData,
      images: imagesString,
      description: describe,
      userId: id,
    }));
  };
  

   useEffect(() => {
         console.log(formData.images);
         console.log(formData);
             
   },[formData]) 

   useEffect(() => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              description:describe,
              images:image.toString(),
              userId:id
            }))
   },[image,describe,id])


    const postData = async () => {
      handleImageChange()
      try {
         const response = await axios.post('/api/apiProduct',formData)
         router.push('/')
         console.log(response);
         
      } catch (error) {
        console.log(error);
        
      }
    }
    
  return (
    <div className='px-5 max-w-[1280px] mx-auto mb-10'>
        <h1 className='text-3xl font-semibold py-6'>Glasess Ürürn ekle</h1>
        <div className="text-black mt-4">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5" >
                  <div>
                    <label htmlFor="title" className=" font-medium ">Başlık</label>
                    <input type="text" name='title' value={formData.title}  onChange={handleChange} className='w-full h-[50px] border-[1px] rounded-lg px-3 '/>
                 </div>

                
                <div>
                <label htmlFor="category" className=" font-medium ">category</label>
                <input type="text" name='category' value={formData.category}  onChange={handleChange} className='w-full h-[50px] border-[1px] rounded-lg px-3 '/>
                </div>


                <div>
                <label htmlFor="style" className=" font-medium ">style</label>
                <input type="text" name='style' value={formData.style}  onChange={handleChange} className='w-full h-[50px] border-[1px] rounded-lg px-3 '/>
                </div>

                <div>
                <label htmlFor="store" className=" font-medium ">store</label>
                <input type="text" name='store' value={formData.store}  onChange={handleChange} className='w-full h-[50px] border-[1px] rounded-lg px-3 '/>
                </div>

                <div>
                <label htmlFor="size" className=" font-medium ">size</label>
                <input type="text" name='size' value={formData.size}  onChange={handleChange} className='w-full h-[50px] border-[1px] rounded-lg px-3 '/>
                <Size setFormData={setFormData}/>
                </div>
                <div>
                <label htmlFor="inventory" className=" font-medium ">Envanter</label>
                <input type="number" name='inventory' value={formData.inventory}  onChange={handlePriceChange} className='w-full h-[50px] border-[1px] rounded-lg px-3 '/>
                </div>
                <div>
                <label htmlFor="price" className=" font-medium ">Fiyat</label>
                <input type="number" name='price' value={formData.price}  onChange={handlePriceChange} className='w-full h-[50px] border-[1px] rounded-lg px-3 '/>
                </div>
                <div>
                <label htmlFor="color" className=" font-medium ">color</label>
                <input type="text" name='color' value={formData.color}  onChange={handleChange} className='w-full h-[50px] border-[1px] rounded-lg px-3 '/>
                <Color setFormData={setFormData} Color={formData.color}/>

                </div>
            </div>
            <label htmlFor="describe" className=" font-medium inline-block mt-10 ">Açıklama</label>
            <Para setDescribe={setDescribe}  description={formData.description}/>
            
            <label htmlFor="image" className=" font-medium inline-block mt-10 ">Resim Yükle.</label>
            <ImageUpload info={info} updateInfo={setInfo} image={image} setImage={setImage} 
                          handleImageChange={handleImageChange}
                          />

           <button onClick={postData} 
                    className='text-white mt-10 border-[1px] bg-gray-600 rounded-lg px-5 p-2 '   
                          >
            send
            </button>
            </div>
            </div>


  )
}

export default Productform