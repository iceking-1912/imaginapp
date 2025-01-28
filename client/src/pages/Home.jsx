import React, { useState, useEffect } from 'react'

import { Loader, Card, FormField } from '../components/'
import CreatePost from './CreatePost'

const RenderCards = ({ data, title }) => {
  {
    if (data.length > 0) {
      return data.map((post) =>
        <Card key={post._id} {...post} />
      )
    } else {
      return (<h2 className='font-bold text-[#150dff] text-xl uppercase'>{title}</h2>)
    }
  }
}
const Home = () => {

  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState([])

  const [searchText, setSearchText] = useState("")
  const [searchedResults, setSearchedResults] = useState([])
  const [searchedTimeout, setSearchedTimeout] = useState(null)
  
  const [imgURL, setimgURL] = useState("");

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
    fetchPosts();
    
  }, []
)
  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
    setTimeout(() => {
      const searchResults = allPosts.filter((item) => item.name.
        toLowerCase().includes(searchText.toLowerCase()) || item.
          prompt.toLowerCase().includes(searchText.toLowerCase()));
      setSearchedResults(searchResults)
    }, 500)
  }

  const ranimgfetch = async (preimg, allPosts) => {
    try {
      console.log(allPosts);
      
      const ranChoice = Math.floor(Math.random() * Object.keys(allPosts).length)

      const ranImg = allPosts[ranChoice].photo
      if (preimg === ranImg) {
        ranimgfetch()
      }
      return ranImg
      // setAllPosts(result.data.reverse());
    } catch (err) {
      alert(err);
    }
  }




  return (
    // <section
    //   style={{ backgroundImage: `url(${imgURL})` }}
    //   className=' 
    //       mx-auto bg-transparent p-5
    //       bg-cover
    //        '>
      
      <section
      style={{ backgroundImage: `url(${imgURL})` }}
      className=' mx-auto bg-cover p-5 m-10
        
                sm:m-5 sm:mx-auto sm:flex sm:flex-col sm:mt-10
           lg:mx-auto lg:grid lg:grid-cols-1 lg:mt-10
          backdrop-blur-2xl  bg-white bg-opacity-25 rounded-[1rem]  shadow-2xl

        '>

      
      <div>
        <h1 className="font-extrabold text-black text-4xl ">Aglaia Community Pix</h1>
        <p className="text-black  text-lg max-w-xl">Share your photos with the world</p>
      </div>
      <div className='mt-16'>
        <FormField
          labelName="Search Posts"
          prompt
          type="text"
          name="text"
          placeholder="Cat"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>


      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-black text-xl mb-3'>
                Showing Results for <span className="text-[#150dff] font-extrabold ">{searchText}</span>
              </h2>
            )}
              <div className='grid lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 grid-cols-1 gap-3 '>
              {searchText ? (
                <RenderCards className=""
                  data={searchedResults}
                  title='No Results Found' />
              ) : (

                <RenderCards
                  data={allPosts}
                  title="No Posts Yet"
                />
              )}
            </div>
          </>
        )}
      </div>




    </section>

  )
}

export default Home