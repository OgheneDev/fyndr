import React from 'react'

const NewsletterSection = () => {
  return (
    <section className='px-5 py-8 md:p-12 md:py-10 bg-[#DBD0C84D] flex flex-col items-center'>
        <article className='text-center space-y-3 mb-4'>
            <h2 className='font-bold text-2xl md:text-3xl'>Subscribe to our Newsletter</h2>
            <p className='text-[12px]'>Subscribe to get latest news and updates from us</p>
        </article>

        <div className='bg-white px-3 md:px-5 py-3 w-full md:w-fit flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-10 rounded-sm'>
    <input 
        type="email" 
        placeholder='Your Email Address' 
        className='w-full md:w-auto min-w-0 placeholder:text-[12px] outline-0 placeholder:text-[#000000]'
    />
    <button
        className='w-full md:w-auto bg-[#57132A] text-white text-sm py-2 px-5 rounded-sm'
    >
        Send
    </button>
</div>
    </section>
  )
}

export default NewsletterSection