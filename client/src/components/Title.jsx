import React from 'react'

const Title = ({ title, subTitle, align }) => {
  return (
    <div className={`flex flex-col justify-center items-center text-center px-4 ${align === "left" && " md:items-start md:text-left"}`}>
      <h1 className='font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-tight'>{title}</h1>
      <p className='text-sm sm:text-base md:text-lg text-gray-500/90 mt-2 sm:mt-3 max-w-sm sm:max-w-lg lg:max-w-2xl'>{subTitle}</p>
    </div>
  )
}

export default Title
