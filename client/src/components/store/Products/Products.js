import { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../ProductsItem/ProductItem'

import "./Products.css"

const Products = () => {
  const state = useContext(GlobalState)
  const [ products ] = state.productAPI.products

  return (
      <div className='products'>
        <div className='product_container container grid'>
          {
            products.map((product, index) => {
              return <ProductItem key={index} product={product}/>
            })
          }
        </div>
      </div>
  )
}

export default Products
