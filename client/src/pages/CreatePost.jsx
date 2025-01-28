import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { preview } from '../assets/'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'

import { usePollinationsImage } from '@pollinations/react';

const CreatePost = () => {


    const navigate = useNavigate()
    const [form, setForm] = useState(() => {
        const savedForm = localStorage.getItem("formData");
        return savedForm ? JSON.parse(savedForm) : {
            name: '',
            prompt: '',
            photo: '',
            width: 0,
            height: 0,
            seed: Math.floor(Math.random() * 100000000000)
        };
    });

    const [generatingImg, setGeneratingImg] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dospecify, changespecify] = useState(true)

// const getImageUrl = usePollinationsImage(
//     form.prompt,
//     {
//         width: 720,
//         height: 720,
//         seed: Math.floor(Math.random() * 100),
//         model: 'flux'
//     }
// );

const [photoURL, setphotoURL] = useState("")
useEffect(() => {
    const photo = JSON.parse(localStorage.getItem('formData'))?.photo
    setphotoURL(photo);
}, []);
    const generateImg = async () => {
        if (!form.prompt) {
            alert('Please provide a prompt');
            return;
        }
        try {
            setGeneratingImg(true);
            const response = await fetch('http://localhost:8090/api/v1/hf/', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({ prompt: form.prompt,width: form.width , height:form.height, seed:form.seed })
            });

            const data = await response.json();
            // setForm({ ...form, photo: `data.image/png;base64,${data.image.image}` });

            if (data.image) {
                // setForm({ ...form, photo: `data:image/png;base64,${data.image}` });
                localStorage.setItem("formData", JSON.stringify({ ...form, photo: data.image }));

                setForm({ ...form, photo: `${data.image}` });
            } else {
                console.error('No image data received');
            }

        } catch (error) {
            console.error('Error generating image:', error);
        } finally {
            setTimeout(() => {

                setGeneratingImg(false);
            }, 2000);
        }
    };

    const handleSubmit = async () => {
        // e.preventDefault();

        if (form.name && form.prompt && form.photo) {
            setLoading(true);

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");


            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(form),
            };
            try {
                const response = await fetch("http://localhost:8090/api/v1/post", requestOptions);
                // const response = await response.json();
                // alert(`Success: ${response.data._id}`);
                navigate('/');
            } catch (error) {
                console.log('Error storing data:', error);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please fill out all fields');
        }
    };


    const handleChange = (e) => {
        const { id, value } = e.target

        localStorage.setItem("formData", JSON.stringify({
            ...form, [id]: id === "width" && value > 2160 ? 2160 :
                id === "height" && value > 2160 ? 2160 :
                    id === "seed" && value > 100000000000 ? 100000000000 :
                        value
        }));
        setForm({
            ...form,
            [id]: id === "width" && value > 3840 ? 3840 :
                id === "height" && value > 2160 ? 2160 :
                    id === "seed" && value > 100000000000 ? 100000000000 :
                        value
        })
    }

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt();
        localStorage.setItem("formData", JSON.stringify({ ...form, prompt: randomPrompt }));
        setForm({ ...form, prompt: randomPrompt });
    };

    return (
        <section
            style={{ backgroundImage: `url(${photoURL})` }}
            className=' mx-auto bg-cover p-5'>
            <div className=" p-5 h-fill
      sm:w-11/12 sm:mx-auto sm:mt-10
  md:w-11/12 md:mx-auto
  lg:w-11/12 lg:mx-auto  lg:grid  lg:grid-cols-12 lg:gap-4 lg:mt-10
        backdrop-blur-lg  bg-white bg-opacity-35 rounded-[1rem]  shadow-xl">

                <div className=' col-span-4 xs:w-full md:w-fill '>
                    <div>
                        <h1 className="font-extrabold mb-2 text-black text-4xl">Create Aglaia Pix</h1>
                        <p className="text-gray-900 text-lg">Create stunning and imaginative images generated by AI, and
                            showcase your creativity to the world.
                        </p>
                    </div>
                    <form className=' flex-shrink w-fill mt-10  ' onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5  ">
                            <FormField
                                prompt
                                labelName="Your Name"
                                type="text"
                                name="name"
                                placeholder="FrostKnight"
                                value={form.name}
                                handleChange={handleChange}
                                doWhat="submit"
                            />
                            <FormField
                                prompt
                                labelName="Prompt"
                                type="textarea"
                                name="prompt"
                                placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                                value={form.prompt}
                                handleChange={handleChange}
                                isSurpriseMe
                                handleSurpriseMe={handleSurpriseMe}
                            />
                            <FormField
                                // labelName="Prompt"
                                // type="textarea"
                                // name="prompt"
                                // prompt
                                // placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                                // value={form.prompt}
                                handleChange={handleChange}
                                // isSurpriseMe
                                // handleSurpriseMe={handleSurpriseMe}
                                dospecify
                                width={form.width}
                                height={form.height}
                                seed={form.seed}
                            />
                            {/* <button className='bg-[#151dff]  hover: active:bg-[black] text-white px-4 py-2 rounded-md' onClick={() => changespecify(!dospecify)}>
                                Image Specification
                            </button> */}
                        </div>
                        <div className='mt-auto mb-5 flex gap-5'>
                            <button
                                type='button'
                                onClick={generateImg}
                                className='mt-3 w-full font-semibold text-[#150dff] px-5 rounded-[5px] bg-gray-200 active:bg-[#48ff00] active:text-black hover:bg-black hover:text-white py-2'>
                                {generatingImg ? "Generating..." : "Generate"}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-span-8  ">
                    <div className="lg:pl-8 grid grid-rows h-fit ">
                        <div
                            className='    relative bg-grey-50 border  border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 p-2 flex items-center justify-center'
                        >
                            {form.photo ? (<img
                                src={form.photo}
                                alt={form.prompt}
                                className=' mx-auto   object-contain rounded-lg'
                            />) : (<img
                                src={preview}
                                alt="preview"
                                className='mx-auto object-contain opacity-50'
                            />)}
                            {generatingImg && (<div
                                className='absolute inset-0 bg-black bg-[rgba(0,0,0,0.5)] flex items-center justify-center rounded-lg'>
                                <Loader />
                            </div>)}
                        </div>
                        <div className='mt-auto'>
                            <div className='mt-5 text-xs text-center'>
                                <p>Created a stunning masterpiece? Share it with the Community!</p>
                            </div>
                            <button
                                className='mt-3 text-orange-600 font-bold w-full h-10 bg-black px-5 rounded-[5px] active:bg-[#48ff00] active:text-black hover:bg-black hover:text-white py-2'
                                onClick={handleSubmit}>
                                Share with The Community!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreatePost


