const ProductItem = ({product}) => {
    return (
        <div className="product">
            <img src={product.images.url}/>

            <h3>{product.title}</h3>
            <p>${product.price}</p>
        </div>
    )
}

export default ProductItem
