import { useState, useEffect } from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if(token){
            const getUser = async () => {
                try {
                    const res = await axios.get('http://localhost:5000/user/infor', {
                        headers: {Authorization: token},
                        withCredentials: true
                    })

                    setCart(res.data.cart)
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                } catch (error) {
                    console.log(error)
                }
            }

            getUser()
        }
    }, [token])

    const addCart = async (product) => {
        if(!isLogged) return alert('Please login to buy')

        const isBuying = cart.every(item => {
            return item._id !== product._id
        })

        if(isBuying){
            setCart([...cart, {...product, quantity: 1}])

            await axios.patch('http://localhost:5000/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
                headers: { Authorization: token }
            })
        }else{
            alert('This product has been added to cart')
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addToCart: addCart
    }
}


export default UserAPI