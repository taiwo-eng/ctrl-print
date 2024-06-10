import { ProductItem } from "./ProductItem"

export function HomePageProducts () {
    const products = [1,2,3,4,5,6];
    return (
        <div className="homepage-products">
            {products.map((product) => <ProductItem key={product} slug={product} />)}
        </div>
    )
}