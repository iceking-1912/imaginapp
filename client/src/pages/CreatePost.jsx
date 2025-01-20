import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { preview } from '../assets/'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'

import { usePollinationsImage } from '@pollinations/react';

const CreatePost = () => {


    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: ''
    })

    const [generatingImg, setGeneratingImg] = useState(false)
    const [loading, setLoading] = useState(false)

    const getImageUrl = usePollinationsImage(
        form.prompt,
        {
            width: 720,
            height: 720,
            seed: Math.floor(Math.random() * 100),
            model: 'flux'
        }
    );

    const generateImg = async () => {
        if (form.prompt) {
            try {
                setGeneratingImg(true);
                const response = await fetch('http://localhost:3000/fetch-image', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params: {
                        prompt: form.prompt,
                        width: 720,
                        height: 720,
                        model: 'flux',
                        seed: Math.floor(Math.random() * 100),
                    },X
                });

                const data = await response.json();
                setForm({ ...form, photo: data.imageUrl });
            } catch (error) {
                console.error('Error generating image:', error);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Please provide a prompt');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.name && form.prompt && form.photo) {
            setLoading(true);

            try {
                const response = await fetch('http://localhost:3000/store-data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });

                await response.json();
                navigate('/');
            } catch (error) {
                console.error('Error storing data:', error);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please fill out all fields');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt();
        // const imgUrl = getImageUrl; photo: imgUrl
        setForm({ ...form, prompt: randomPrompt});
    };

    return (
        <section className='
        mx-auto bg-transparent h-5/6 p-5 
        sm:w-3/4 sm:mx-auto sm:grid sm:grid-cols-1 sm:mt-10 
        md:w-3/4 md:mx-auto  md:grid md:grid-cols-1 
        lg:w-2/4 lg:mx-auto lg:grid lg:grid-cols-1lg:mt-10
        backdrop-blur-2xl  bg-white bg-opacity-25 rounded-[1rem]  shadow-xl 
        '>
            <div>
                <h1 className="font-extrabold mb-2 text-black text-4xl">Create Aglaia Pix</h1>
                <p className="text-gray-600 text-lg">Create stunning and imaginative images generated by AI, and showcase your creativity to the world.
                </p>
            </div>

            <form className=' w-fill mt-10  ' onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5 ">
                    <FormField
                        labelName="Your Name"
                        type="text"
                        name="name"
                        placeholder="FrostKnight"
                        value={form.name}
                        handleChange={handleChange}
                        doWhat="Save"

                    />
                    <FormField
                        labelName="Prompt"
                        type="textarea"
                        name="prompt"
                        placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleSurpriseMe}
                    />

                    <div className='relative w-full bg-grey-50 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 h-64 p-2 flex items-center justify-center '>
                        {form.photo ? (
                            <img src={form.photo} alt={form.prompt} className='w-full h-full object-cover rounded-lg' />
                        ) : (
                            <img src={preview} alt="preview" className='h-64 object-cover opacity-50 ' />
                        )}
                        {generatingImg && (
                            <div className='absolute inset-0 bg-black bg-[rgba(0,0,0,0.5)] flex items-center justify-center rounded-lg'>
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
                <div className='mt-5 flex gap-5'>
                    <button
                        type='button'
                        onClick={generateImg}
                        className='mt-5 w-full font-semibold text-[#150dff] px-5 rounded-[5px] bg-gray-200 active:bg-[#48ff00] active:text-black hover:bg-black hover:text-white py-2'>
                        {generatingImg ? "Generating..." : "Generate"}
                    </button>
                </div>
                <div className='mt-5  text-center '>
                    <p>Created a stunning masterpiece? Share it with the Community!</p>
                </div>
                <button
                    className='mt-3  text-orange-600 font-bold w-full h-10 bg-black px-5 rounded-[5px] active:bg-[#48ff00] active:text-black hover:bg-black hover:text-white py-2' to="/" onClick={() => navigate('/')}>
                    Share with The Community!
                </button>
            </form>
        </section>
    )
}

export default CreatePost









// const item = [
//     {
//         // prompt: "a whimsical treehouse village nestled in the treetops, connected by rope bridges and ladders",
//         width: 720,
//         height: 1280,
//         seed: 43,
//         model: "flux"
//     },
// ];


// const [prompt, setPrompt] = useState("")

// // const [imageUrl, setImageUrl] = usePollinationsImage(prompt, {
//     width: item[0].width,
//     height: item[0].height,
//     seed: item[0].seed,
//     model: item[0].model
// })

// const handleSubmit = (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setGeneratingImg(false)
//     setLoading(false)
// }

// const items = [
//     {
//         prompt: "a whimsical treehouse village nestled in the treetops, connected by rope bridges and ladders",
//         width: 720,
//         height: 1280,
//         seed: 43,
//         model: "flux"
//     },
//     {
//         prompt: "a group of astronauts exploring a distant galaxy, marveling at the wonders of the universet",
//         width: 720,
//         height: 1280,
//         seed: 44,
//         model: "flux"
//     }, {
//         prompt: "a fantasy kingdom with a majestic castle perched on a hill, overlooking the realm",
//         width: 720,
//         height: 1280,
//         seed: 43,
//         model: 'flux'
//     }, {
//         prompt: "a robot chef meticulously preparing a gourmet meal in a high-tech kitchen with advanced appliances",
//         width: 720,
//         height: 1280,
//         seed: 43,
//         model: 'flux'
//     },
//     {
//         prompt: "A futuristic city with flying cars and neon lights",
//         width: 1980,
//         height: 1020,
//         seed: 44,
//         model: 'flux',
//     }
// ];

// const [displayItems, setDisplayItems] = useState([])
