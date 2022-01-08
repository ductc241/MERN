import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { GlobalState } from '../../../GlobalState'
import "./Header.css"

const Header = () => {
    const data = useContext(GlobalState)

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
                        <li className="nav_item">
                            <Link to="/history" className='nav_link'>History</Link>
                        </li>
                        <li className="nav_item">
                            <Link to="/order" className='nav_link'>Login</Link>
                        </li>
                    </ul>
                    <div className="nav_button">
                        <i className="nav_icon fas fa-luggage-cart"></i>
                    </div>
                </div>

           </nav>
        </div>
    )
}

export default Header
