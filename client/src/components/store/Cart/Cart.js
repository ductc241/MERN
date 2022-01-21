import { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import Paypal from '../Paypal';

import "./Cart.css"

const Cart = () => {
    const state = useContext(GlobalState)
    const [cart] = state.userAPI.cart

    if(cart.length === 0){
        return (
            <div className='cart'>
                <div className='cart_container container'>
                    <h1 style={{ textAlign: 'center' }}>Cart Empty</h1>
                </div>
            </div>

        )
    }

    return (
        <div className='cart'>
            <div className='cart_container container'>
                <table className="cart_table">
                    <thead>
                        <tr className="cart_header">
                            <th>Title</th>
                            <th>Image</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                            cart.map(product => (
                                <tr className="cart_item" key={product._id}>
                                    <td>{ product.title }</td>
                                    <td>
                                        <img src={product.images.url} style={{ width: 100 }}/>
                                    </td>
                                    <td>${ product.price }</td>
                                </tr>
                            ))
                       }
                    </tbody>
                </table>

                <Paypal />
            </div>
        </div>
    )
};

export default Cart;
