import React, { useState, useEffect } from 'react'

import { Loader, Card, FormField } from '../components/'
import CreatePost from './CreatePost'


const RenderCards = ({ data, title }) => {{
  if (data.length > 0) {
    return data.map((post) =>
      <div className='p-2'>
        <Card key={post._id} {...post} />
      </div>
    )
  } else {
    return (<h2 className='font-bold text-[#150dff] text-xl uppercase'>{title}</h2>)
  }
}
}
const Home = () => {

  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState([])

  const [searchText, setSearchText] = useState()

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8090/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <section className=' m-10
        mx-auto bg-transparent p-5
        w-11/12 h-full
        sm:m-5 sm:w-11/12 sm:mx-auto sm:flex sm:flex-col sm:mt-10
        lg:w-5/6 lg:mx-auto lg:grid lg:grid-cols-1lg:mt-10
        backdrop-blur-2xl  bg-white bg-opacity-25 rounded-[1rem]  shadow-2xl '>
      <div>
        <h1 className="font-extrabold text-black text-4xl ">Aglaia Community Pix</h1>
        <p className="text-black  text-lg max-w-xl">Share your photos with the world</p>
      </div>
      <div className='mt-16'>
        {/* <FormField /> */}
      </div>
      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-black text-1xl'>
                Showing Results for <span className="text-[#150dff] font-extrabold ">{searchText}</span>
              </h2>
            )}
            <div className='grid lg:grid-cols-5 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 mt-5'>
              {searchText ? (
                <RenderCards data={[]} title='No Results Found' />
              ) : (
                // <RenderCards data={allPosts} title='NaBro' />
                    <div className='grid-row-7 w-full '>
                  {allPosts.length > 0 ? (
                        <RenderCards className="row-span-1"  data={allPosts} /> // Pass data to Card component
                  ) : (
                    <p>Hie</p>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>

  )
}

export default Home