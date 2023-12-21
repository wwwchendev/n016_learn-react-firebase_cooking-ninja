import { NavLink } from 'react-router-dom'
import './Navbar.css'
import Searchbar from './Searchbar'

export default function Navbar() {
  return (
    <div className="navbar">
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
