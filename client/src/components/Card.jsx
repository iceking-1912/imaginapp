import React from 'react'

import { download } from '../assets'
import { downloadImage } from '../utils'

const Card = ({ _id, name, prompt, photo }) => {
    return (
        <div
            className=' group relative shadow-card hover:shadow-cardhover card
            transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
            <img
                className='rounded-xl w-fit h-fit object-cover'
                src={photo}
                alt={prompt}
            />
            
        </div>


    )
}



export default Card