import React, { createContext, useState } from 'react'
import ProductAPI from './api/ProductAPI'


export const GlobalState=  createContext()

export const DataProvider = ({children}) => {
    const state = {
        productAPI: ProductAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}

