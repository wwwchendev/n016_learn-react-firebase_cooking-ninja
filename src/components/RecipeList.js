import { Link } from 'react-router-dom'

// styles
import './RecipeList.css'

export default function RecipeList({ recipes }) {
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div key={recipe.id} className="card">
          <h3>{recipe.title}</h3>
          <p>上菜時間 {recipe.cookingTime}</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>查看食譜</Link>
        </div>
      ))}
    </div>
  )
}
