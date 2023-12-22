import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Create, Recipe, Search } from './pages'
import Navbar from './components/Navbar'
// 載入ContextProvider包裹子組件 #context
import { ThemeProvider } from './context/ThemeContext'
import ThemeSelector from './components/ThemeSelector'

export default function Router() {
  return (<>
    <ThemeProvider value={{ color: 'blue' }}>
      <Navbar />
      <ThemeSelector/>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/search" element={<Search />} />
        <Route path="/recipes/:id" element={<Recipe />} />
      </Routes>
    </ThemeProvider>
  </>
  )
}
