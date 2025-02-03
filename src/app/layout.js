"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import "./globals.css";

import CreatePost from "./pages/create_post/CreatePost.jsx";
import logo from "../assets/logo.svg";

export default function RootLayout() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

    const headerStyle = {
      // height: '72px',
      // padding: '0px',
      // backgroundColor: '#007eb6',
      zIndex: 99,
      position: "sticky",
      top: 0,
    };

  return (
    <html lang="en">
      <body>
        <CreatePost />
      </body>
    </html>
  );
}
