import React from 'react'
import TestimonialsSlider from './TestimonialsSlider'

const TestimonialsSection = () => {
  return (
    <section id='testimonials' className='py-8 md:py-12 px-5 md:px-10'>
        <article className='text-center space-y-3'>
            <h2 className='font-bold text-2xl'>Testimonials</h2>
            <p className='text-sm'>What are our customers saying?</p>
        </article>
        <TestimonialsSlider />
    </section>
  )
}

export default TestimonialsSection