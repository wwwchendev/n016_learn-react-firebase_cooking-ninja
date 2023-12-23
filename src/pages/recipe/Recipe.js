import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useThemeContext } from '../../hooks/useThemeContext'

import './Recipe.css'
import editIcon from '../../assets/edit.svg'
import closeIcon from '../../assets/close.svg'

import RecipeForm from '../../components/RecipeForm'

// import { useFetch } from "../../hooks/useFetch"
import { firestore } from '../../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
// TODO Firebase Firestore
// doc()： 用於創建指向特定文檔（Document）的引用。
// getDoc()： 這個方法用於獲取特定文檔的快照。
// collection()： 用於獲取指向特定集合（Collection）的引用。
// getDocs()： 這個方法用於獲取集合中所有文檔的快照。

export default function Recipe() {
  const { id } = useParams()
  const { mode } = useThemeContext()
  // 定義資料請求狀態
  // const { data, isPending, error, postData } = useFetch(`http://localhost:3000/recipes/${id}`)
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  const [isEdit, setIsEdit] = useState(false)


  // 宣告請求資料的函數
  async function fetchData() {
    try {
      const recipeRef = doc(firestore, 'recipes', id);
      const snapshot = await getDoc(recipeRef);
      if (snapshot.exists()) {
        setData(snapshot.data());
        setIsPending(false)
      } else {
        setError(`找不到食譜資料`)
        setIsPending(false)
      }
    } catch (error) {
      console.log(error);
    }
  }
  // 發送請求取得firebase資料庫內容
  useEffect(() => {
    setIsPending(true)
    fetchData();
  }, []);

  const RecipeInfo = () => {
    return (
      <>
        {data && (
          <>
            <h2 className="page-title">{data.title}</h2>
            <p>上菜時間 {data.cookingTime}</p>
            <ul>
              {data.ingredients.map(ingredient => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
            <div className="method">{data.method}</div>
          </>
        )}
      </>
    );
  };
  const handleSubmit = async (e, title, ingredients, method, cookingTime) => {
    e.preventDefault()
    const info = { title, ingredients, method, cookingTime: cookingTime + ' 分鐘' }
    try {
      const recipeRef = doc(firestore, 'recipes', id);
      await updateDoc(recipeRef, info);
      alert(`已保存變更`);
      setIsEdit(false);
      fetchData()
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && isEdit ? <>
        <RecipeForm id={id} data={data} setIsEdit={setIsEdit} handleSubmit={handleSubmit} fetchData={fetchData}/>
        <img className="editIcon" src={closeIcon} alt="" onClick={() => { setIsEdit(false) }} />
      </> : <>
        <RecipeInfo />
        <img className="editIcon" src={editIcon} alt="" onClick={() => { setIsEdit(true) }} />
      </>
      }
    </div>
  )
}
