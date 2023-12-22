import React from 'react'
import './Recipe.css'
import { useFetch } from "../../hooks/useFetch"
import { useParams } from 'react-router-dom'
import { useThemeContext } from '../../hooks/useThemeContext'

export default function Recipe() {
  const {id} = useParams()
  const { data, isPending, error, postData } = useFetch(`http://localhost:3000/recipes/${id}`)
  const { mode } = useThemeContext()

  return (

    <div className={`recipe ${mode}`}>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <>
        <h2 className="page-title">{data.title}</h2>
          <p>上菜時間 {data.cookingTime}</p>
        <ul>
          {
            data.ingredients.map(ingredient=><li key={ingredient} >{ingredient}</li>)
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
