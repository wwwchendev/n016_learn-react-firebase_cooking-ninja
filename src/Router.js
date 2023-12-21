import React from 'react'
import { BrowserRouter,HashRouter,Routes,Route } from 'react-router-dom'
import { Home,Create,Recipe,Search} from './pages'
import Navbar from './components/Navbar'
export default function Router() {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" exact element={<Home/>}/>
            <Route path="/create" element={<Create/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/recipes/:id" element={<Recipe/>}/>
        </Routes>
    </BrowserRouter>
  )
}
