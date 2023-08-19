'use client'
import React, { useState } from 'react';
import { BsChevronUp, BsSliders2Vertical } from 'react-icons/bs';

type Props = {
  selectCategory: string[];
  setSelectCategory: React.Dispatch<React.SetStateAction<string[]>>;
  selectSize: string[];
  setSelectSize: React.Dispatch<React.SetStateAction<string[]>>;
  selectPrice: { min: number; max: number };
  setSelectPrice: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
};

const initialCategories = ['Sun Glasses', 'Blue Block', 'Optical Glasses'];

const Filter: React.FC<Props> = ({
  selectCategory,
  setSelectCategory,
  selectSize,
  setSelectSize,
  selectPrice,
  setSelectPrice,
}) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.name === 'min' ? parseInt(e.target.value) : selectPrice.min;
    setSelectPrice({
      ...selectPrice,
      min: value,
    });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.name === 'max' ? parseInt(e.target.value) : selectPrice.max;
    setSelectPrice({
      ...selectPrice,
      max: value,
    });
  };

  const toggleCategory = (category: string) => {
    setSelectCategory((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const toggleSize = (size: string) => {
    setSelectSize((prevSize) =>
      prevSize.includes(size) ? prevSize.filter((c) => c !== size) : [...prevSize, size]
    );
  };

  return (
    <div className='relative'>
      <div className={`md:w-[250px] border-l-1 border-r-1 ${showFilter ? 'max-md:w-[250px]' : 'w-0 max-md-invisible'}`}>
        <div className='flex items-center justify-center px-5 py-4 border-b-1'>
          <h1 className='text-gray-700'>Filters</h1>
          <BsSliders2Vertical size={20} onClick={() => setShowFilter(!showFilter)} className='text-gray-700 cursor-pointer' />
        </div>
        <div className='flex flex-col py-3 pb-5 text-sm text-gray-600 border-b-1'> 
          <h2 className='mb-2 font-semibold'>Categories</h2>
            {initialCategories.map(category => (
                 <label key={category} className='flex items-center space-x-2'>
                <input
                    type='checkbox'
                    checked={selectCategory.includes(category)}
                    onChange={() => toggleCategory(category)}
                  />
                   <span>{category}</span>
                 </label>
                ))}
        </div>
          <div className='pb-10 border-b-[1px]'>
             <div className='flex items-center justify-between px-5 py-4 border-b-[1px] mb-5'>
              <h1 className='text-gray-700 '>Price</h1>
              <BsChevronUp size={18} className='text-gray-700 '/>
             </div>
             <div className='grid gird-cols-2 gap-5 px-5 overflow-hidden'>
              <div className="flex flex-col justify-center items-center">
                <label htmlFor="" className='text-[15px] opacity-75'>Min</label>
                <div className='relative'>
                  <span className='absolute left-3 top-1'>₺</span>
                  <input type="number"  
                        className="w-full outline-none border-[1px] rounded-lg px-2 text-center py-[2px]"
                         name='min'
                         onChange={handleMinChange} 
                         id='' 
                         value={selectPrice.min} 
                         />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <label htmlFor="" className='text-[15px] opacity-75'>Max</label>
                <div className='relative'>
                  <span className='absolute left-3 top-1'>₺</span>
                  <input type="number"  
                        className="w-full outline-none border-[1px] rounded-lg px-2 text-center py-[2px]"
                         name='max'
                         onChange={handleMaxChange} 
                         id='' 
                         value={selectPrice.max} 
                         />
                </div>
              </div>
             </div>
          </div>
          <div className='sizes'>
            <div className='items-center flex justify-center px-5 py-4 border-b-[1px] mb-5'>
            <h1 className='text-gray-700 '>Size</h1>
            </div>
            <ul className='grid grid-cols-4 px-5 gap-5'>
              <li className={`border-[1px] rounded-lg text-center text-[14px] py-1 cursor-pointer ${selectSize.includes('S') ? 'bg-gray-700 text-white' : ''}`}
                  onClick={() => toggleSize('S')}
              >S</li>
               <li className={`border-[1px] rounded-lg text-center text-[14px] py-1 cursor-pointer ${selectSize.includes('M') ? 'bg-gray-700 text-white' : ''}`}
                  onClick={() => toggleSize('M')}
              >M</li>
               <li className={`border-[1px] rounded-lg text-center text-[14px] py-1 cursor-pointer ${selectSize.includes('LG') ? 'bg-gray-700 text-white' : ''}`}
                  onClick={() => toggleSize('LG')}
              >LG</li>
            </ul>
          </div>
      </div>
      <div onClick={() => setShowFilter(!showFilter)} className='absolute top-[20px] right-[-42px] md:hidden  rotate-90 bg-gray-100 cursor-pointer'>Filters</div>
    </div>
  )
}

export default Filter
