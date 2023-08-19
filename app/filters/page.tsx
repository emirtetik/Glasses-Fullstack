import React, { useState, useEffect } from 'react';

const initialCategories = [
  'Sun Glasses',
  'Blue Block',
  'Optical Glasses',
];

const Page = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectCategory, setSelectCategory] = useState<string[]>(initialCategories);
  const [selectSize, setSelectSize] = useState<string[]>([]);
  const [selectStyle, setSelectStyle] = useState<string[]>([]);
  const [selectPrice, setSelectPrice] = useState({
    min: 0,
    max: 100,
  });
 const [response, setResponse] = useState<any>([]);
 
  return (
    <div>
    </div>
  );
};

export default Page;
