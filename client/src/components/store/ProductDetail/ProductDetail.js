import { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../ProductsItem/ProductItem'


import './ProductDetail.css'

const ProductDetail = () => {
    const params = useParams()
    const state = useContext(GlobalState)
    const [ products ] = state.productAPI.products
    const [productDetail, setproductDetail] = useState()


    useEffect(() => {
        if(params){
            const product = products.find(product => product._id === params.id)
            setproductDetail(product)
        }
    }, [params, products])

    if(!productDetail){
        return (
            <p>Loading</p>
        )
    }

    return (
        <div className='container'>
            <div className='prDetail'>
                <div className='prDetail_container grid'>
                    <div className='peDetail_image'>
                        <img src={productDetail.images.url} />
                    </div>
                    <div className='prDetail_content'>
                        <p className='title'>{productDetail.title}</p>
                        <p className='price'>${productDetail.price}</p>
                        <button className='btn'>Add To Card</button>
                    </div>
                </div>
            </div>

            <div className='product_related'>
                <h2>Product Related</h2>
                <div className='prRelated_container grid'>
                    {products.map((product, index) => {
                        return (product.category === productDetail.category && product._id != productDetail._id) 
                                    ? <ProductItem key={index} product={product} /> 
                                    : null
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
