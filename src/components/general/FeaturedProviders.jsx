import React from 'react'
import ProvidersSlider from './ProvidersSlider'

const FeaturedProviders = () => {
  return (
    <div className='px-5 mb-5'>
        <article className='flex justify-between'>
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