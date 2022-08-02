import React from 'react'
import spinner from '../../assets/spinner.svg'

const Loader = () => {
    return (
        <div className='flex flex-row h-8 space-x-2 my-10 justify-center cursor-default'>
            <img src={spinner} alt=" " className='bg-background' /><p className='my-auto'>Loading...</p>
        </div>
    )
}

export default Loader