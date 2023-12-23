import React, { useState, useRef } from 'react'
import './RecipeForm.css'


export default function RecipeForm({ status,data,handleSubmit}) {
    //定義表單資料變數
    const [title, setTitle] = useState(data.title)
    const [method, setMethod] = useState(data.method)
    const [cookingTime, setCookingTime] = useState(data.cookingTime.slice(0, -3))
    const [ingredients, setIngredients] = useState(data.ingredients)
    const [newIngredient, setNewIngredient] = useState('')
    const [tags, setTags] = useState(data.tags)
    const [newTag, setNewTag] = useState('')
    //選取DOM元素
    const ingredientInput = useRef(null)
    const tagInput = useRef(null)
    const recipeInfo = { title, ingredients, method, cookingTime: cookingTime + ' 分鐘',tags }
    return (
        data && <>
            {/* <div>
                <p>{`食譜名稱: ${title}`}</p>
                <p>{`食譜成分: ${newIngredient}`}</p>
                <p>{`已新增: ${ingredients.map(e => e)}`}</p>
                <p>{`料理方法: ${method}`}</p>
                <p>{`上菜時間(分鐘): ${cookingTime}`}</p>
                <p>{`標籤: ${tags.map(e => e)}`}</p>
            </div> */}
            <h2 className="page-title">
                {status==="create"?"和大家分享新食譜": `正在修改 ${data.title}...` }       
            </h2>
            <form onSubmit={(e) => handleSubmit(e, recipeInfo)}>
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
                <label>
                    <span>主題標籤：</span>
                    <div className="ingredients">
                        <input
                            type="text"
                            onChange={(e) => setNewTag(e.target.value)}
                            value={newTag}
                            ref={tagInput}
                        />
                        <button
                            className="btn"
                            onClick={(e) => {
                                e.preventDefault()
                                const val = newTag.trim()
                                if (val && !tags.includes(val)) {
                                    setTags(pre => [...pre, val])
                                }
                                setNewTag('')
                                tagInput.current.focus()
                            }}>增加</button>
                        <button
                            className="btn clearBtn"
                            onClick={(e) => {
                                e.preventDefault()
                                setTags([])
                            }}
                        >清空</button>
                    </div>
                </label>
                <p>已新增: {tags.map(i => <em key={i}>{i}, </em>)}</p>

                <button type='submit' className="btn">提交</button>
            </form>
        </>
    )
}
