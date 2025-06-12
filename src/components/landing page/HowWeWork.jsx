import React from 'react'
import HowItWorksSlider from './HowItWorksSlider'

const HowWeWork = () => {
  return (
    <section className='px-5 py-8 md:py-17 md:px-12 bg-[#57132A]'>
        <article className='text-white mb-3'>
            <h2 className='text-2xl md:text-3xl font-bold mb-3'>How it Works?</h2>
            <p className='text-sm'>Connect with nearby Merchants offering services you need Connect with nearby Merchants offering services you need Connect with nearby Merchants </p>
        </article>
        <HowItWorksSlider />
    </section>
  )
}

export default HowWeWork