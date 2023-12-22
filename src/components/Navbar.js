import { NavLink } from 'react-router-dom'
import './Navbar.css'
import Searchbar from './Searchbar'
// 在Context.Provider範圍的子元件中載入Context和useContext
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function Navbar() {
  // 解構Context.Provider組件的內容
  const { color } = useContext(ThemeContext)
  return (
    // 應用解構變數
    <div className="navbar" style={{ backgroundColor: color }}>
      <nav>
        <NavLink to="/" className="brand">
          <h1>烹飪達人</h1>
        </NavLink>
        <Searchbar />
        <NavLink to="/create">
          建立食譜
        </NavLink>
      </nav>
    </div>
  )
}
