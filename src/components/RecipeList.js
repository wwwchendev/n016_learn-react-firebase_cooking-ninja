import { Link } from 'react-router-dom';
import { useThemeContext } from '../hooks/useThemeContext'

import { firestore } from '../firebase/config';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
// styles
import './RecipeList.css'
import Trashcan from '../assets/trashcan.svg'

export default function RecipeList({ recipes, }) {
  const { mode } = useThemeContext()

  if(recipes.length===0){
    return <p className="error">查無相關食譜</p>
  }

  const handleClick = async(id)=>{
    try{
      const recipeRef = doc(firestore, 'recipes', id);
      const snapshot = await getDoc(recipeRef);
      const recipeData = snapshot.data();
      await deleteDoc(recipeRef);
      if (recipeData) {
        alert(`已刪除食譜 ${recipeData.title}`);
      }
    }catch(error){
        console.log(error);
    }
  }

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>上菜時間 {recipe.cookingTime}</p>
          <div>{recipe.method.substring(0, 40)}...</div>
          <Link to={`/recipes/${recipe.id}`}>查看食譜</Link>
          <img 
            className="delete"
            onClick={() => handleClick(recipe.id)}
            src={Trashcan} alt="delete icon" 
          />
        </div>
      ))}
    </div>
  )
}
