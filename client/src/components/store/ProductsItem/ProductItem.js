import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import "./ProductItem.css"


const ProductItem = ({product}) => {
    const state = useContext(GlobalState);

    return (
        <div className="product">
            <img src={product.images.url}/>

            <div className="product_content">
                <p className="product_name">{ product.title }</p>
                <p className="product_price">${ product.price }</p>
                <p className="product_description">{ product.description }</p>
                <div className="product_action grid">
                    <button className="btn">
                        <Link className='btn' to={`/shop/${product._id}`}>Detail</Link>
                    </button>
                    
                    <button className="btn" onClick={() => state.userAPI.addToCart(product)}>Add Card</button>
                </div>
            </div>
        </div>
    )
}

export default ProductItem
