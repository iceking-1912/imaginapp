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
            className=' relative p-2 rounded-xl group shadow-card hover:shadow-cardhover card  
            transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100'>
            <img
                className='w-full h-full object-cover rounded-xl '
                src={photo}
                alt={prompt}
            />

            <div className='group-hover:flex flex-col max-h-[70.5%] overflow-hidden
            hidden absolute bottom-0 right-0 left-0 bg-[#0f121fdc] m-4 p-2
            rounded-md  '>

                <div className=' grid grid-row-2' >

                    <p className='text-white text-xs sm:text-sm md:text-base overflow-y-auto ' >{prompt}</p>

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
