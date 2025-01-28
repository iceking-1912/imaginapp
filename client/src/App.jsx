import React, { useEffect, useState } from 'react';
import { BrowserRouter, data, Link, Route, Routes } from 'react-router-dom';
import { useLocation } from "react-router-dom"

import { logo } from './assets';
import Home from './pages/Home.jsx'
import CreatePost from './pages/CreatePost.jsx'
// import GeneratedImageComponent from './polinate.jsx'

const fetchPosts = async () => {
  try {
    const response = await fetch('http://localhost:8090/api/v1/post', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    const ranChoice = Math.floor(Math.random() * Object.keys(result).length)
    const ranImg = result.data[ranChoice].photo
    return ranImg
    // setAllPosts(result.data.reverse());
  } catch (err) {
    alert(err);
  }
}

// Separate component to use router hooks
function AppContent() {
  const [imgURL, setimgURL] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    const ranbackground = async () => {
      // if (pathname === "/create-post") {
      //   const fData = JSON.parse(localStorage.getItem('formData'));
      //   const img = fData?.photo;
      //   if (img) setimgURL(img);
      // } else if (pathname === "/") {
        const img = await fetchPosts();
        setimgURL(img);
      // }
    };
    ranbackground();
  }, [pathname]);

  return (
    <div
      // style={{ backgroundImage:`url(${ imgURL})`}}
      className='flex flex-col justify-center h-full w-screen '>
      <header className="w-full flex justify-between items-center bg-black sm:px-8 px-4 py-4">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <Link to="/create-post" className="font-medium bg-[#0008ff] text-white px-4 py-2 rounded-md">Create</Link>
      </header>
      <main className="w-screen h-screen">
        {/* sm:h-[calc(110vh-30px)]  md:h-[calc(100vh-10px)] lg:h-[calc(100vh-72px)] */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </div>
  );
}

// Main App component
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
export default App;

