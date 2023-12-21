import React from 'react'
import './Recipe.css'
import { useFetch } from "../../hooks/useFetch"
import { useParams } from 'react-router-dom'

export default function Recipe() {
  const {id} = useParams()
  const { data, isPending, error, postData } = useFetch(`http://localhost:3000/recipes/${id}`)
  return (

    <div className="recipe">
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <>
        <h2 className="page-title">{data.title}</h2>
        <ul>
          {
            data.ingredients.map(ingredient=><li>{ingredient}</li>)
          }
        </ul>
        <div className="method">{data.method}</div>
      </>
      }
      {/* <div className="">
        {
          data&& JSON.stringify(data)
        }
      </div> */}
    </div>

  )
}
