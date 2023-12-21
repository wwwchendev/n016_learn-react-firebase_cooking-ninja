import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// styles
import './Searchbar.css'

export default function Searchbar() {
  const [term, setTerm] = useState('')
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    setTerm('')
    navigate(`/search?q=${term}`)
  }

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search"></label>
        <input 
          id="search" 
          type="text" 
          value={term}
          placeholder='搜尋食譜..'
          onChange={(e) => setTerm(e.target.value)} 
          required 
        />
      </form>
    </div>
  )
}
