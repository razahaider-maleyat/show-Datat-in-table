"use client"
import Posts from "../pages/Posts"
import { useEffect, useState } from "react";
const PRODUCT_API_URI = "https://fakestoreapi.com/products/";

export type PostData = {
category: string,
description: string,
id:number,
image: string,
price: number,
rating:{rate:number, count:number}
title: string
}

export default function Home() {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    async function getData() {
      
      try {
        const response = await fetch(PRODUCT_API_URI);
    
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        
        setPosts(json);
      } catch (error) {
        if(error instanceof Error)
        console.error(error.message);
      }
    }

    getData();
  }, []); 

  return (
    <div>
      <Posts postsData={posts}/>
    </div>
  );
}
