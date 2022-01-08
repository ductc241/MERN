import { useState, useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

import { Link } from 'react-router-dom'

const Header = () => {
    const data = useContext(GlobalState)

    return (
        <div className="header">
           <nav className="nav container">
                <Link to="/shop" className="nav_logo">
                    Rolex
                </Link>

                <div className="nav_menu">

                </div>

                <div className="nav_button">

                </div>
           </nav>
        </div>
    )
}

export default Header
