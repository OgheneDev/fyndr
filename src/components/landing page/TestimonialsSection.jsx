import React from 'react'
import TestimonialsSlider from './TestimonialsSlider'

const TestimonialsSection = () => {
  return (
    <section className='py-8 md:py-12'>
        <article className='text-center space-y-3'>
            <h2 className='font-bold text-2xl'>Testimonials</h2>
            <p>What are our customers saying?</p>
        </article>
        <TestimonialsSlider />
    </section>
  )
}

export default TestimonialsSection