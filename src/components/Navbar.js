import { NavLink } from 'react-router-dom'
import './Navbar.css'
import Searchbar from './Searchbar'
// // 在Context.Provider範圍的子元件中載入Context和useContext
// import { useContext } from 'react'
// import { ThemeContext } from '../context/ThemeContext'

// 改為載入自定義的hook"useTheme" #context
import { useThemeContext } from '../hooks/useThemeContext'
import { useState } from 'react'

export default function Navbar() {
  // 解構Context.Provider組件的內容 #context
  // const { color } = useContext(ThemeContext)
  const { color , setColor } = useThemeContext()
  useState(()=>{
    setColor('orange');
  },[])
  
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
