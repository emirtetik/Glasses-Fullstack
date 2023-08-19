'use client'
import React, { useState } from 'react'

interface SizeProps{
    setFormData: React.Dispatch<React.SetStateAction<any>>
}
const Size = ({setFormData}: SizeProps) => {
    const [sizes, setSizes] = useState<string[]>([])
    const availableSizes = ['sm', 'md', 'lg']

    const handleSizeButton = (size: string) => {
        setSizes((prevSizes) => {
            if (prevSizes.includes(size)) {
                return prevSizes.filter((prevSize) => prevSize !== size)
            } else {
                return [...prevSizes, size]
                
            }
        })
    }

    const handleSubmit = () => {
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            size: sizes.join(', '), 
        }));
    };
  return (
    <div>
            {availableSizes.map((size) => (
                <button
                    key={size}
                    onClick={() => handleSizeButton(size)}
                    className={`border-[1px] cursor-pointer mt-4 mb-5 mr-5 rounded-lg text-center text-[14px] px-3 py-1 hover:bg-gray-100 ${
                        sizes.includes(size) ? 'bg-gray-500 text-white' : ''
                    }`}
                >
                    {size}
                </button>
            ))}
            <button onClick={handleSubmit}>Submit</button>
        </div>
  )
}

export default Size