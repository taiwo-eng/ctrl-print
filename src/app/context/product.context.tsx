"use client";

import React, { createContext, useState } from 'react';

export const ProductItemsContext = createContext({});

export default function ProductContext({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    const [products, setProducts] = useState([
        {name: 'Yosola Bubu: Geometric Midi Gown', color: 'Blue', id: '1', description: "Our Yosola Adire gown is a stunning fusion of contemporary style and West African artistry. Ethically dyed and crafted from soft, breathable cotton, this dress is a wardrobe essential that radiates elegance and cultural richness.This dress features a Vibrant blue color with geometric circle patterns, and a contrasting blush bib.", price: '85'}, 

        {name: 'Yosola Bubu: Multicolour Gown', color: 'Green, Orange, & Blue', id: '7', description: "Our Yosola Adire gown is a stunning fusion of contemporary style and West African artistry. Ethically dyed and crafted from soft, breathable cotton, this dress is a wardrobe essential that radiates elegance and cultural richness. The eye-catching Orange, Green and blue prints are guaranteed to elevate every wardrobe.", price: '85'}, 

        {name: 'Yosola Bubu: Geometric Midi Gown', color: 'Mustard', id: '3', description: "Our Yosola Adire gown is a stunning fusion of contemporary style and West African artistry. Ethically dyed and crafted from soft, breathable cotton, this dress is a wardrobe essential that radiates elegance and cultural richness. This eye-catching piece, made from pure cotton, features a rich mustard palette with intricate geometric patterns.", price: '85'}, 

        {name: 'Yosola Bubu: XO Pattern multicolour Gown', color: 'Green, Orange, Purple, & Pink', id: '4', description: "Our Yosola Adire gown is a stunning fusion of contemporary style and West African artistry. Ethically dyed and crafted from soft, breathable cotton, this dress is a wardrobe essential that radiates elegance and cultural richness. The fabric has a repeating pattern of intersecting 'X' and 'O' shapes, arranged in a grid-like formation. A geometric design that gives the fabric a lively and modern look.", price: '85'}, 

        {name: 'Yosola Bubu: Geometric Midi Gown', color: 'Black', id: '2', description: "Our Yosola Adire gown is a stunning fusion of contemporary style and West African artistry. Ethically dyed and crafted from soft, breathable cotton, this dress is a wardrobe essential that radiates elegance and cultural richness. This versatile yet sophisticated ,and bold print easily transitions from day to night is your new wardrobe staple.", price: '85'},

        {name: 'Yosola Mini Bubu: Adire mini gown', color: 'Multicoloured', id: '6', description: 'Our Yosola mini dress is a stylish must-have for any wardrobe. Made from comfortable cotton and showcasing our signature blend of prints and colors, this dress is designed to turn heads. Whether you wear it alone or layer it creatively, it’s a versatile piece. Add a touch of sophistication with heels, a box clutch, and bold accessories for a night out.', price: '70'},

        {name: 'Yosola Mini Bubu: Mini gown', color: 'Blue, Pink, & Green', id: '5', description: 'Our Yosola mini dress is a stylish must-have for any wardrobe. Made from comfortable cotton and showcasing our signature blend of prints and colors, this dress is designed to turn heads. Whether you wear it alone or layer it creatively, it’s a versatile piece. Add a touch of sophistication with heels, a box clutch, and bold accessories for a night out.', price: '70'},







        // JEWELRY 
        {name: 'Yosola Mini Bubu: Mini gown', color: 'Blue, Pink, & Green', id: '17', description: 'Our Yosola mini dress is a stylish must-have for any wardrobe. Made from comfortable cotton and showcasing our signature blend of prints and colors, this dress is designed to turn heads. Whether you wear it alone or layer it creatively, it’s a versatile piece. Add a touch of sophistication with heels, a box clutch, and bold accessories for a night out.', price: '25'},

        {name: 'Yosola Bubu: Multicolour Gown', color: 'Green, Orange, & Blue', id: '9', description: "Our Yosola Adire gown is a stunning fusion of contemporary style and West African artistry. Ethically dyed and crafted from soft, breathable cotton, this dress is a wardrobe essential that radiates elegance and cultural richness. The eye-catching Orange, Green and blue prints are guaranteed to elevate every wardrobe.", price: '110'}, 

        {name: 'Yosola Mini Bubu: Mini gown', color: 'Blue, Pink, & Green', id: '14', description: 'Our Yosola mini dress is a stylish must-have for any wardrobe. Made from comfortable cotton and showcasing our signature blend of prints and colors, this dress is designed to turn heads. Whether you wear it alone or layer it creatively, it’s a versatile piece. Add a touch of sophistication with heels, a box clutch, and bold accessories for a night out.', price: '50'},

    
    ]);
    return (
        <ProductItemsContext.Provider value={{products, setProducts}}>
            {children}
        </ProductItemsContext.Provider>
    )
}