import React from 'react'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section className='flex flex-col md:flex-row md:gap-0 md:justify-between gap-5 p-5 md:py-10 md:px-12'>
        <div className="text-content md:w-[40%]">
            <article className='space-y-5 mb-7'>
                <h1 className='text-3xl md:text-5xl font-bold'>
                    Connect with nearby<br className='hidden md:block' /> 
                    Merchants offering<br className='hidden md:block' />
                     services you need 
                </h1>
                <p className='text-sm'>Connect with nearby Merchants offering services you<br className='hidden md:block' />
                 need Connect with nearby Merchants offering<br className='hidden md:block' />
                  services you need Connect with nearby Merchants<br className='hidden md:block' />
                   offering services you need Connect with nearby<br className='hidden md:block' />
                    Merchants offering services you need </p>
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

        <div className="image-content md:w-[60%]">
            <Image
              src={'/images/hero.jpg'}
              width={100}
              height={100}
              alt='Hero'
              className='w-full h-auto'
            />
        </div>
    </section>
  )
}

export default HeroSection