import axios from 'axios'
import {useState, useEffect} from 'react'

const ProductAPI = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const response = await axios.get('http://localhost:5000/api/product', {
                withCredentials: true
            })
            setProducts(response.data.products)
        }

        getProducts()
    }, [])

    return {
        products: [products, setProducts]
    }
}

export default ProductAPI
