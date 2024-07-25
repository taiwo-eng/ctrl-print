import { ProductItem } from "./ProductItem"

export function HomePageProducts () {
    const products = [{name: 'Multicolour Adire Midi Bubu with yellow and green', id: '1'}, 
        {name: 'Green, orange and blue multicolour adire bubu gown', id: '2'}, 
        {name: 'Yellow Geomeetric Print Adire Bubu', id: '3'}, 
        {name: 'Burnt Orange Geometrc Print', id: '4'}, 
        {name: 'Blue, pink & green adire mini gown', id: '5'}];
    return (
        <div className="homepage-products">
            {products.map((product) => <ProductItem name={product.name} key={product.id} slug={product.id} />)}
        </div>
    )
}