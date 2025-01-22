import React, { useState, useEffect } from 'react'

import { Loader, Card, FormField } from '../components/'
import CreatePost from './CreatePost'

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />)
  }
  return (<h2 className='font-bold text-[#150dff] text-xl uppercase'>{title}</h2>)
}

const Home = () => {

  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState()

  const [searchText, setSearchText] = useState('Himalayas')

  return (
      <section className='
        mx-auto bg-transparent h-5/6 p-5
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
                  <RenderCards data={[]} title='NaBro' />
                )}
              </div>
            </>
          )}
        </div>
      </section>
  
  )
}

export default Home