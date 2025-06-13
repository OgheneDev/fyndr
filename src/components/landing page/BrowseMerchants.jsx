import React from 'react'
import { services } from '@/data/data'
import Image from 'next/image'

const BrowseMerchants = () => {
  return (
    <section id='services' className='px-5 py-8 md:py-14 md:px-12'>
        <article className='mb-10'>
            <h2 className='text-2xl md:text-3xl font-bold mb-3'>Browse Merchants by Services</h2>
            <p>Check services we offer with merchants offering them</p>
        </article>

        <div className="flex flex-col md:flex-row gap-5">
            {services.map((service, index) => (
                <div 
                  key={index}
                  className='md:w-[300px]'
                >
                    <Image
                     src={service.image}
                     width={50}
                     height={50}
                     alt='Service Image'
                     className='w-full h-auto md:h-[230px] rounded-lg mb-5'
                    />
                    <h3 className='font-bold'>{service.title}</h3>
                    <p className='text-sm text-[#856670]'>{service.description}</p>
                </div>
            ))}
        </div>
    </section>
  )
}

export default BrowseMerchants