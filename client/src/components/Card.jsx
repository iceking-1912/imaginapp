import React from 'react'

import download from '../assets/download.png'
import { downloadImage } from '../utils'

const Card = ({ _id, name, prompt, photo }) => {

    function downLoadBtun() {
        // const photo = 
        downloadImage(_id, photo)
    }
    return (
        <div
            className='flex flex-row group relative shadow-card hover:shadow-cardhover card
            transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105'>
            <img
                className='rounded-xl w-fit h-fit object-cover'
                src={photo}
                alt={prompt}
            />
            <div className='group-hover:flex flex-cool max-h-[94.5%]
            hidden absolute bottom-0 right-0 left-0 bg-[#0F121F] m-2 p-2
            rounded-md  '>

                <div className=' grid grid-row-2' >

                    <p className='text-sky-100 text-xs sm:text-sm md:text-base overflow-y-auto ' >{prompt}</p>

                    <div className='mt-5 flex justify-between items-center gap-2 '>


                        <div className=' w-8 h-8 flex items-center justify-center gap-2 rounded-full bg-orange-700 object-cover '>
                            <div>
                                {name[0]}
                            </div>
                        </div>

                    <button className='w-[32px] h-[32px] ml-auto mr-2 ' onClick={downLoadBtun} >
                            <img src={download} className='invert'  ></img>
                        </button>

                    </div>





                </div>

            </div>

        </div>


    )
}



export default Card