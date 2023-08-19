import React from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
interface ImageProps{
    info:any
    updateInfo: React.Dispatch<React.SetStateAction<any>>
    image:string[]
    setImage:React.Dispatch<React.SetStateAction<string[]>>
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const ImageUpload = ({info,updateInfo,image,setImage,handleImageChange}: ImageProps) => {
    
     const onupload = (result:any) => {
      const postMessage = (obj:any) => {
        obj = JSON.parse(JSON.stringify(obj));
        parent.postMessage(obj, 'whatever');
      }
        updateInfo(result.info.secure_url)
        const newImage = result.info.secure_url
        setImage(preImage => [...preImage,newImage])
        handleImageChange(result)
     }

     const handleDeleteImage = (index:number) => {
        setImage(preImage => {
            const updateImage = [...preImage]
            updateImage.splice(index,1)
            return updateImage
        })
     }
  return (
    <div>
       <div className='mb-10'>
        
          <CldUploadWidget uploadPreset='zxv2sccd' onUpload={onupload}>
               {({open}:any) => {
                function handleOnClick(e: React.MouseEvent<HTMLButtonElement>) {
                    e.preventDefault()
                    open()
                }
                return <button className='border-[1px] rounded-lg p-1 px-2' onClick={handleOnClick}>
                                  Resim Ekle
                      </button>
               }}
            </CldUploadWidget>        
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols2 grid-cols-1 gap-10'>
            {image.map((imageurl, index) => (
              <div key={index} className='flex flex-col justify-center'>
                 <Image
                 property=''
                width={250}
                height={300}
                src={imageurl}
                alt={`uploaded Images ${index + 1}`}
                className='object-cover object-top'
              />
                     <button
                       className='border-[1px] rounded-lg p-1 px-2 mt-5'
                       onClick={() => handleDeleteImage(index)}
                     >
                       Delete Image
                     </button>
                   </div>
                 ))}

            </div>
       </div>
    </div>
  )
}

export default ImageUpload
