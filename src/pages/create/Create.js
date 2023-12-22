import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './Create.css'
// import { useFetch } from "../../hooks/useFetch"
import { firestore } from '../../firebase/config';
import { collection, addDoc, getDoc} from 'firebase/firestore';

export default function Create() {
  //定義表單資料變數
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  //選取DOM元素
  const ingredientInput = useRef(null)

  // const { postData, data } = useFetch('http://localhost:3000/recipes', 'POST')
  const navigate = useNavigate();

  const addIngredient = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim()
    if (ing && !ingredients.includes(ing)) {
      setIngredients(pre => [...pre, ing])
    }      
    setNewIngredient('')
    ingredientInput.current.focus()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // postData({ title, ingredients, method, cookingTime: cookingTime + ' 分鐘' })
    const doc = { title, ingredients, method, cookingTime: cookingTime + ' 分鐘' }
    try {
      const recipesCollectionRef = collection(firestore, 'recipes');
      const res = await addDoc(recipesCollectionRef, doc);
      const snapshot = await getDoc(res);
      alert(`已新增 ${snapshot.data().title} 的食譜`);
      navigate('/')
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  }

  return (
    <div className="create">
      {/* <div>
        <p>{`食譜名稱: ${title}`}</p>
        <p>{`食譜成分: ${newIngredient}`}</p>
        <p>{`已新增: ${ingredients.map(e => e)}`}</p>
        <p>{`料理方法: ${method}`}</p>
        <p>{`上菜時間(分鐘): ${cookingTime}`}</p>
      </div> */}
      <h2 className="page-title">和大家分享新食譜</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>食譜名稱:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>食譜成分：</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={addIngredient} className="btn">增加</button>
          </div>
        </label>
        <p>已新增: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

        <label>
          <span>料理方法：</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>上菜時間(分鐘)：</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button type='submit' className="btn">提交</button>
      </form>
    </div>
  )
}
