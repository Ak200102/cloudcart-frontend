import React from 'react'
import { cn } from './ui/cn'

const Input = ({type,placeholder,className,value,onChange,required}) => {
  return (
    <input type={type} placeholder={placeholder} className={cn('w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border border-gray-400 outline-none',className)}
    value={value}
    onChange={onChange}
    required={required}
    />
    
  )
}

export default Input
