import { useFetch } from "../../hooks/useFetch"
import { useLocation } from 'react-router-dom'
import RecipeList from "../../components/RecipeList"
import './Search.css'

export default function Search() {
  // 使用 useLocation 來獲取搜尋參數的UTF-8編碼
  // 比方搜尋蝦仁 但queryString結果是'?q=%E8%9D%A6%E4%BB%81'
  const queryString = useLocation().search 
  // 建立`URLSearchParams`物件對URL中的 query string做解析和操作
  // 使用 get() 方法取得指定參數的值
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get('q')

  /* 
  JSON Server預設使用q作為搜尋關鍵字的query參數，會返回所有value包含關鍵字的資料
  JSON Server也有內建其他搜尋機制例如 
  ?"key"       返回指定欄位與檢索字串完全相符的資料
  ?"key"_like 返回指定欄位中包含該檢索字串的資料
  */
  const url = 'http://localhost:3000/recipes?q=' + query
  // const url = 'http://localhost:3000/recipes?title_like=' + query
  const { error, isPending, data } = useFetch(url)
  return (
    <div>
      <h2 className="page-title">為您搜尋包含 "{query}" 的食譜</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}  
      {data && <RecipeList recipes={data} />}
    </div>
  )
}
