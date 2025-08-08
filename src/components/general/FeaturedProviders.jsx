import React from 'react'
import ProvidersSlider from './ProvidersSlider'

const FeaturedProviders = () => {
  return (
    <div className='px-5 mb-5 md:max-w-3xl md:mx-auto'>
        <article className='flex justify-between text-sm'>
            <h2>Featured Service Providers</h2>
            <button>See all</button>
        </article>
        <div>
          <ProvidersSlider />
        </div>
    </div> 
  )
}

export default FeaturedProviders