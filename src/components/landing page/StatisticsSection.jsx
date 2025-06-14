import React from 'react'
import { statistics } from '@/data/data'

const StatisticsSection = () => {
  return (
    <section className='px-5 py-8 md:p-12 md:py-10'>
        <div className='flex flex-wrap justify-between gap-5 md:gap-0'>
            {statistics.map((stat, index) => (
                <div
                 key={index}
                 className='flex flex-col items-center gap-2'
                >
                    <h3 className='font-bold text-3xl'>{stat.value}</h3>
                    <p className='text-sm'>{stat.title}</p>
                </div>
            ))}
        </div>
    </section>
  )
}

export default StatisticsSection