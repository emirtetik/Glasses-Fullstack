import React, { useState } from 'react';

interface ColorProps {
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    Color: string;
}

const Color = ({ setFormData, Color: selectedColor }: ColorProps) => {
    const colors = ['white', 'black', 'red'];

    const handleColorButton = (color: string) => {
        setFormData((prevData: any) => ({
            ...prevData,
            color: color,
        }));
    };

    return (
        <div className="mt-2">
            {colors.map((color) => (
                <button
                    key={color}
                    onClick={() => handleColorButton(color)}
                    className={`border-[1px] w-6 h-6 mr-2 rounded-full cursor-pointer ${color === selectedColor ? `border-2 border-${color}` : ''}`}
                    style={{ backgroundColor: color }}
                ></button>
            ))}
        </div>
    );
};

export default Color;
