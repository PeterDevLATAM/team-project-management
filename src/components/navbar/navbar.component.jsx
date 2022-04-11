import { Link } from 'react-router-dom'
import {useLogout} from "../../hooks/useLogout"


// styles & images
import './navbar.styles.css'
import Temple from '../../assets/temple.svg'

export default function Navbar() {
  const {logout, isPending}=useLogout()
  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>Team Project Management</span>
        </li>

        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li>
          {!isPending && <button className="btn" onClick={logout} >Logout</button>}
          {isPending && <button className="btn" disabled >Loggin out...</button>}
        </li>
      </ul>
    </nav>
  )
}
