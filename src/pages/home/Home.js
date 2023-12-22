import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import './Home.css'
import { useFetch } from "../../hooks/useFetch"
import RecipeList from "../../components/RecipeList"
// 載入資料庫
import { firestore } from '../../firebase/config';

export default function Home() {
  const {data, isPending, error, postData} = useFetch(`http://localhost:3000/recipes`)

  // 確認是否連接成功
  useEffect(() => {
    async function fetchData() {
      try{
        const snapshot = await getDocs(collection(firestore, 'recipes'));
        console.log(`Firebase資料庫連線成功`);
        console.log(`文件集合是否有資料:${snapshot.empty?false:true}(${snapshot.size})`);
        //>> Firebase資料庫連線成功
        //>> 文件集合是否有資料:true(1)
      }catch(error){
        console.log(`Firebase資料庫連線失敗`);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="home">
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={data}></RecipeList>}
    </div>
  )
}
