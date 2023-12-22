import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Create, Recipe, Search } from './pages'
import Navbar from './components/Navbar'
import ThemeSelector from './components/ThemeSelector'
import { useThemeContext } from './hooks/useThemeContext'

import './Router.css'

export default function Router() {
  const { mode } = useThemeContext()
  return (<>
    <div className={`App ${mode}`}>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipes/:id" element={<Recipe />} />
        </Routes>
    </div>
  </>
  )
}
