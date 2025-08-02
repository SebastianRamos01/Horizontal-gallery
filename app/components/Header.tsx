import React from 'react'

const description = 'Photographer passionate about capturing the essence of every moment.'

export default function Header() {
  return (
    <header className='h-20 flex items-center fixed top-0 z-10'>
        <nav className='px-5 grid grid-cols-8 lg:grid-cols-24'>
            <h1 className='col-span-2'>
                Lyra Astra
            </h1>
            <p className='col-start-3 col-span-6 leading-tight'>
                {description}
            </p>
        </nav>
    </header>
  )
}
