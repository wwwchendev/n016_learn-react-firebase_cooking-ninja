import React, { useEffect, useState } from 'react'
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import './Home.css'
// import { useFetch } from "../../hooks/useFetch"
import RecipeList from "../../components/RecipeList"
// 載入資料庫
import { firestore } from '../../firebase/config';

export default function Home() {
  // const {data, isPending, error, postData} = useFetch(`http://localhost:3000/recipes`)
  // 定義資料請求狀態
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  // // 宣告請求資料的函數
  // async function fetchData() {
  //   try{
  //     const snapshot = await getDocs(collection(firestore, 'recipes'));
  //     if(snapshot.empty){ 
  //       setError(`沒有食譜資料可載入`) 
  //       setIsPending(false)
  //     }else{
  //       let result = []
  //       snapshot.forEach((doc) => {
  //         result.push({id:doc.id, ...doc.data()}) 
  //         //>>[{"id":"Ms1coJHpv9wqBimbVP6R","cookingTime":"45 分鐘","title":"蔬菜燉湯","ingredients":["1 顆紅蘿蔔","1 條韭菜","200 克豆腐","300 毫升蔬菜湯底"],"method":"1. 將烤箱預熱至 200C/3C/煤氣 5。將紅蘿蔔、韭菜和豆腐放入大碗中。添加蔬菜湯底並充分攪拌。 2. 添加其餘的配料並充分攪拌。 3. 將混合物放入大碗中，蓋上蓋子。 4. 將蓋子放在烤箱中烹飪 40 分鐘。 5. 搭配您喜歡的沙拉一起享用"}]
  //       });      
  //       setData(result)
  //       setIsPending(false)
  //     }
  //   }catch(error){
  //     console.log(error);
  //   }
  // }

  // 發送請求取得firebase資料庫內容
  useEffect(() => {
    setIsPending(true)
    // fetchData();
    
    // TODO onSnapshot
    // 在 onSnapshot 方法中，第一個參數是用於訂閱的集合的參考（reference），而第二個參數是一個回調函數，當集合中的文件發生變化時會被調用。
    // 每當集合中的文件新增、修改或刪除時，onSnapshot 的回調函數都會被觸發，並提供一個新的 snapshot，其中包含了更新後的集合狀態。
    
    const recipeRef = collection(firestore, 'recipes');
    const unsubscribe = onSnapshot(recipeRef, (snapshot) => {
      if (snapshot.empty) {
        setError('沒有食譜資料可載入');
        setIsPending(false);
        setData([]); // 清空資料
        return;
      } else {
        const recipesData = [];
        snapshot.forEach((doc) => {
          recipesData.push({ id: doc.id, ...doc.data() });
        });
        setData(recipesData);
        setIsPending(false);
      }
    })
    // 返回取消訂閱的函數
    return unsubscribe;
  }, []);

  // 確認是否連接成功
  // useEffect(() => {
  //   async function fetchData() {
  //     try{
  //       const snapshot = await getDocs(collection(firestore, 'recipes'));
  //       console.log(`Firebase資料庫連線成功`);
  //       console.log(`文件集合是否有資料:${snapshot.empty?false:true}(${snapshot.size})`);
  //       //>> Firebase資料庫連線成功
  //       //>> 文件集合是否有資料:true(1)
  //     }catch(error){
  //       console.log(`Firebase資料庫連線失敗`);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className="home">
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={data}></RecipeList>}
    </div>
  )
}
