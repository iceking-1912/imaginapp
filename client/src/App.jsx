import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import Home from './pages/Home.jsx'
import CreatePost from './pages/CreatePost.jsx'
// import GeneratedImageComponent from './polinate.jsx'


const App = () => (
  <BrowserRouter><div className=' flex flex-col justify-center h-full bg-cover bg-center'>

    <header className="w-full flex justify-between items-center bg-black sm:px-8 px-4 py-4 ">
      <Link to="/">
        <img src={logo} alt="logo" className="w-28 object-contain " />
      </Link>

      <Link to="/create-post" className="font-medium bg-[#0008ff] text-white px-4 py-2 rounded-md">Create</Link>
    </header>
    <main className=" w-full bg-hero-img bg-cover h-100vh">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        {/* <Route path="/generated-image" element={<GeneratedImageComponent />} /> */}
      </Routes>
    </main>
  </div>
  </BrowserRouter>
);

export default App;

