import React, { useState, useRef } from 'react'
import './RecipeForm.css'


export default function RecipeForm({ data,handleSubmit}) {
    //定義表單資料變數
    const [title, setTitle] = useState(data.title)
    const [method, setMethod] = useState(data.method)
    const [cookingTime, setCookingTime] = useState(data.cookingTime.slice(0, -3))
    const [ingredients, setIngredients] = useState(data.ingredients)
    const [newIngredient, setNewIngredient] = useState('')
    //選取DOM元素
    const ingredientInput = useRef(null)

    return (
        data && <>
            {/* <div>
                <p>{`食譜名稱: ${title}`}</p>
                <p>{`食譜成分: ${newIngredient}`}</p>
                <p>{`已新增: ${ingredients.map(e => e)}`}</p>
                <p>{`料理方法: ${method}`}</p>
                <p>{`上菜時間(分鐘): ${cookingTime}`}</p>
            </div> */}
            <h2 className="page-title">正在修改 {data.title} ...</h2>
            <form onSubmit={(e) => handleSubmit(e, title, ingredients, method, cookingTime)}>
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
                        <button
                            className="btn"
                            onClick={(e) => {
                                e.preventDefault()
                                const ing = newIngredient.trim()
                                if (ing && !ingredients.includes(ing)) {
                                    setIngredients(pre => [...pre, ing])
                                }
                                setNewIngredient('')
                                ingredientInput.current.focus()
                            }}>增加</button>
                        <button
                            className="btn clearBtn"
                            onClick={(e) => {
                                e.preventDefault()
                                setIngredients([])
                            }}
                        >清空</button>
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
        </>
    )
}
