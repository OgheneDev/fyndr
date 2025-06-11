import React from 'react'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section className='flex flex-col gap-5 p-5'>
        <div className="text-content">
            <article className='space-y-5 mb-7'>
                <h1 className='text-3xl font-bold'>
                    Connect with nearby Merchants offering services you need 
                </h1>
                <p className='text-sm'>Connect with nearby Merchants offering services you need Connect with nearby Merchants offering services you need Connect with nearby Merchants offering services you need Connect with nearby Merchants offering services you need </p>
            </article>
            <div className='flex items-center gap-7'>
                <button className='bg-[#57132A] text-white py-3 px-5 rounded-md text-sm'>
                    Learn More
                </button>
                <button className='bg-[#57132A] text-white py-3 px-5 rounded-md text-sm'>
                    Register
                </button>
            </div>
        </div>

        <div className="image-content">
            <Image
              src={'/images/hero.jpg'}
              width={100}
              height={100}
              alt='Hero'
              className='w-full'
            />
        </div>
    </section>
  )
}

export default HeroSection