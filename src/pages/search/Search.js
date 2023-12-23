import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
// import { useFetch } from "../../hooks/useFetch"
import RecipeList from "../../components/RecipeList"

import './Search.css'
import { firestore } from '../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Search() {
  // 使用 useLocation 來獲取搜尋參數的UTF-8編碼
  // 比方搜尋蝦仁 但queryString結果是'?q=%E8%9D%A6%E4%BB%81'
  const queryString = useLocation().search 
  // 建立`URLSearchParams`物件對URL中的 query string做解析和操作
  // 使用 get() 方法取得指定參數的值
  const queryParams = new URLSearchParams(queryString)
  const queryWord = queryParams.get('q')

  /* 
  JSON Server預設使用q作為搜尋關鍵字的query參數，會返回所有value包含關鍵字的資料
  JSON Server也有內建其他搜尋機制例如 
  ?"key"       返回指定欄位與檢索字串完全相符的資料
  ?"key"_like 返回指定欄位中包含該檢索字串的資料
  */
  // const url = 'http://localhost:3000/recipes?q=' + query
  // const url = 'http://localhost:3000/recipes?title_like=' + query
  // const { error, isPending, data } = useFetch(url)

  // 定義資料請求狀態
  const [resultDatas, setResultDatas] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const searchRecipes = async () => {      
      setIsPending(true)
      setError(null);

      const recipesCollection = collection(firestore, 'recipes');
      const searchQuery = queryWord
        ? queryWord.toLowerCase() // 可能需要先轉為小寫或符合你的資料結構
        : '';

      try {
        //取得快照
        const searchByTagsPromise = getDocs( query(recipesCollection, where('tags', 'array-contains', searchQuery))
        );      
        const searchByTitlePromise = getDocs( query(recipesCollection, where('title', '>=', searchQuery), where('title', '<=', searchQuery + '\uf8ff'))
        );      
        //並行執行多個非同步操作提高性能
        const [searchByTagsSnapshot, searchByTitleSnapshot] = await Promise.all([ searchByTagsPromise, searchByTitlePromise ]);
      
        //根據快照提取資料
        const searchByTagsData = searchByTagsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const searchByTitleData = searchByTitleSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));      

        //合併資料
        const combinedData = [...searchByTagsData, ...searchByTitleData];

        //建立Map利用鍵值對將資料以ID作為唯一key，確保合併後的資料中不包含重複ID。
        const uniqueDataMap = new Map();        
        combinedData.forEach((data) => {
          uniqueDataMap.set(data.id, data);
        });              
        //將uniqueDataMap的值轉為陣列後設為最後搜尋結果
        const uniqueDataArray = [...uniqueDataMap.values()];
        setResultDatas(uniqueDataArray)
      } catch (error) {
        console.log(error);
        setError(error.message);
      }      
      setIsPending(false);
    };
    searchRecipes();
  }, [queryWord]);


  return (
    <div>
      <h2 className="page-title">為您搜尋包含 "{queryWord}" 的食譜</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}  
      {resultDatas && <RecipeList recipes={resultDatas} />}
    </div>
  )
}
