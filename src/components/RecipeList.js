import { Link } from 'react-router-dom'
import { useThemeContext } from '../hooks/useThemeContext'

// styles
import './RecipeList.css'

export default function RecipeList({ recipes }) {
  const { mode } = useThemeContext()

  if(recipes.length===0){
    return <p className="error">查無相關食譜</p>
  }

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>上菜時間 {recipe.cookingTime}</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>查看食譜</Link>
        </div>
      ))}
    </div>
  )
}
