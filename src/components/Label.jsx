import React from 'react'
import { cn } from './ui/cn'

const Label = ({children,className,htmlFor}) => {
  return (
    <label htmlFor={htmlFor} className={cn('text-base font-semibold text-gray-600',className)}>{children}</label>
  )
}

export default Label
