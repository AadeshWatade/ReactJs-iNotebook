import React from 'react'
import spinner from '../../assets/spinner.svg'

const Loader = ({ noteLoad }) => {
    return (
        <div className={`flex flex-row h-8 space-x-2 justify-center cursor-default ${!noteLoad ? 'my-10 ' : ''}`}>
            <img src={spinner} alt=" " className='bg-background' /><p className='my-auto'>Loading...</p>
        </div>
    )
}

export default Loader