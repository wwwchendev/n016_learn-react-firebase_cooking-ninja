import React, { useState } from 'react'
import './Home.css'
import { useFetch } from "../../hooks/useFetch"
import RecipeList from "../../components/RecipeList"

export default function Home() {
  const {data, isPending, error, postData} = useFetch(`http://localhost:3000/recipes`)
  return (
    <div className="home">
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={data}></RecipeList>}
      {/* {data && data.map((item,idx)=>{
        return <h2>{item.title}</h2>
      })
      } */}
    </div>
  )
}
