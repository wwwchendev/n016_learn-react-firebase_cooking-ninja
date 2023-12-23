import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useThemeContext } from '../../hooks/useThemeContext'

import './Recipe.css'
import editIcon from '../../assets/edit.svg'
import closeIcon from '../../assets/close.svg'
import tagIcon from '../../assets/tag.svg'

import RecipeForm from '../../components/RecipeForm'

// import { useFetch } from "../../hooks/useFetch"
import { firestore } from '../../firebase/config';
import { collection,doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
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


  // // 宣告請求資料的函數
  // async function fetchData() {
  //   try {
  //     const recipeRef = doc(firestore, 'recipes', id);
  //     const snapshot = await getDoc(recipeRef);
  //     if (snapshot.exists()) {
  //       setData(snapshot.data());
  //       setIsPending(false)
  //       console.log(data);
  //     } else {
  //       setError(`找不到食譜資料`)
  //       setIsPending(false)
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  
  // 發送請求取得firebase資料庫內容
  useEffect(() => {
    setIsPending(true)
    // fetchData();
    const recipeRef = doc(firestore, 'recipes', id);
    const unsubscribe = onSnapshot(recipeRef, (doc) => {
      if (doc.exists()) {
        setData(doc.data());
        setIsPending(false)
      } else {
        setError(`找不到食譜資料`)
        setIsPending(false)
        setData([]);
        return;
      }
    });
    // 返回取消訂閱的函數
    return unsubscribe;
  }, [id]);

  const RecipeInfo = () => {
    return (
      <>
        {data && (
          <>
            <h2 className="page-title">{data.title}</h2>
            <p>上菜時間 {data.cookingTime}</p>
            <ul>
              <p>準備材料：</p>{data.ingredients.map(ingredient => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
            <div className="method">{data.method}</div>
            <ul>
            <img className="tagIcon" src={tagIcon} alt="" />
              {data.tags.map(tag => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </>
        )}
      </>
    );
  };
  const handleSubmit = async (e,recipeInfo) => {
    e.preventDefault()
    try {
      const recipeRef = doc(firestore, 'recipes', id);
      await updateDoc(recipeRef,recipeInfo);
      alert(`已保存變更`);
      setIsEdit(false);
      // fetchData()
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && isEdit ? <>
        <RecipeForm id={id} data={data} setIsEdit={setIsEdit} handleSubmit={handleSubmit} />
        <img className="editIcon" src={closeIcon} alt="" onClick={() => { setIsEdit(false) }} />
      </> : <>
        <RecipeInfo />
        <img className="editIcon" src={editIcon} alt="" onClick={() => { setIsEdit(true) }} />
      </>
      }
    </div>
  )
}
