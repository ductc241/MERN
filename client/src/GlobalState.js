import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

import ProductAPI from './api/ProductAPI'
import UserAPI from './api/UserAPI'

export const GlobalState=  createContext()

export const DataProvider = ({children}) => {
    const [token, setToken] = useState(false)

    useEffect(async () => {
        const firstLogin = localStorage.getItem('firstLogin')

        if(firstLogin){
            const res = await axios.get('http://localhost:5000/user/refresh_token', {
                withCredentials: true
            })
            setToken(res.data.accessToken)
        }
    }, [])

    const state = {
        token: [token, setToken],
        productAPI: ProductAPI(),
        userAPI: UserAPI(token)
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}

