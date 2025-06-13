import React from 'react'
import Image from 'next/image'
import { info } from '@/data/data'

const WorldSection = () => {
  return (
    <section className='px-5 py-8 md:py-17 md:px-12 bg-[#DBD0C84D] flex flex-col md:flex-row gap-5 md:gap-12'>
        <div className="image-content w-1/2">
          <Image
            src={'/images/man.jpg'}
            alt='Delivery Man'
            width={50}
            height={50}
            className='w-full h-auto'
          />
        </div>

        <div className="text-content w-1/2">
          <h1 className='text-3xl md:text-5xl font-bold mb-5 md:mb-8'>The whole world at <br className='hidden md:block' /> your fingertips</h1>
          <div className='grid grid-cols-1 gap-5 md:gap-8 md:w-[60%]'>
            {info.map((item, index) => (
              <div
               key={index}
               className='flex gap-5 items-start'
              >
                <Image
                 src={item.icon}
                 alt='icon'
                 width={40}
                 height={40}
                />
                <article>
                  <h3 className='font-bold text-[16px] mb-1'>{item.title}</h3>
                  <p className='text-sm'>{item.description}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
    </section>
  )
}

export default WorldSection