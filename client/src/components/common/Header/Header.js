import axios from 'axios'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { GlobalState } from '../../../GlobalState'
import "./Header.css"

const Header = () => {
    const state = useContext(GlobalState)
    const [ isLogged ] = state.userAPI.isLogged
    const [ isAdmin ] = state.userAPI.isAdmin

    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
                <li><Link to="/history">History</Link></li>
                <li onClick={logOut}>Logout</li>
            </>
        )
    }

    const logOut = async () => {
        localStorage.clear()
        await axios.get('http://localhost:5000/user/logout', {
            withCredentials: true
        })

        window.location.href = '/'
    }

    return (
        <div className="header">
           <nav className="nav container">
                <Link to="/shop" className="nav_logo">
                    MERN
                </Link>

                <div className="nav_menu">
                    <ul className="nav_list">
                        <li className="nav_item">
                            <Link to="/shop" className='nav_link'>Shop</Link>
                        </li>
                        
                        { isAdmin && adminRouter() }

                        {
                            isLogged ? loggedRouter() : <li><Link to="/login">Login</Link></li>
                        }
                    </ul>
                    <div className="nav_button">
                        <Link to="/cart">
                            <i className="nav_icon fas fa-luggage-cart"></i>
                        </Link>
                    </div>
                </div>
           </nav>
        </div>
    )
}

export default Header
