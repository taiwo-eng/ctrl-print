"use client";

import React, { createContext, useState } from 'react';

export const ProductItemsContext = createContext({});

export default function ProductContext({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    const [products, setProducts] = useState([

        {name: 'Yosola Bubu: Multicolour Gown', color: 'Green, Orange, & Blue', id: '7', description: "Our Yosola Adire gown is a stunning fusion of contemporary style and West African artistry. Ethically dyed and crafted from soft, breathable cotton, this dress is a wardrobe essential that radiates elegance and cultural richness. The eye-catching Orange, Green and blue prints are guaranteed to elevate every wardrobe.", price: '85', tag: "long dress", category: 'dress'}, 

        {name: 'Yosola Bubu: Geometric Midi Gown', color: 'Mustard', id: '3', description: "Our Yosola Adire gown is a stunning fusion of contemporary style and West African artistry. Ethically dyed and crafted from soft, breathable cotton, this dress is a wardrobe essential that radiates elegance and cultural richness. This eye-catching piece, made from pure cotton, features a rich mustard palette with intricate geometric patterns.", price: '85', tag: "long dress", category: 'dress'}, 

        {name: 'Yosola Bubu: XO Pattern multicolour Gown', color: 'Green, Orange, Purple, & Pink', id: '4', description: "Our Yosola Adire gown is a stunning fusion of contemporary style and West African artistry. Ethically dyed and crafted from soft, breathable cotton, this dress is a wardrobe essential that radiates elegance and cultural richness. The fabric has a repeating pattern of intersecting 'X' and 'O' shapes, arranged in a grid-like formation. A geometric design that gives the fabric a lively and modern look.", price: '85', tag: "long dress", category: 'dress'}, 


        {name: 'Yosola Mini Bubu: Adire mini gown', color: 'Multicoloured', id: '6', description: 'Our Yosola mini dress is a stylish must-have for any wardrobe. Made from comfortable cotton and showcasing our signature blend of prints and colors, this dress is designed to turn heads. Whether you wear it alone or layer it creatively, it’s a versatile piece. Add a touch of sophistication with heels, a box clutch, and bold accessories for a night out.', price: '70', tag: "short dress", category: 'dress'},

        {name: 'Yosola Mini Bubu: Mini gown', color: 'Blue, Pink, & Green', id: '5', description: 'Our Yosola mini dress is a stylish must-have for any wardrobe. Made from comfortable cotton and showcasing our signature blend of prints and colors, this dress is designed to turn heads. Whether you wear it alone or layer it creatively, it’s a versatile piece. Add a touch of sophistication with heels, a box clutch, and bold accessories for a night out.', price: '70', tag: "short dress", category: 'dress'},







        // JEWELRY 
        {name: 'Cowrie Floral earrings', color: 'Gold plated', id: '8', description: 'Gold plated jewelry wire and cowrie shell', price: '25', tag:"jewelry", category: 'jewelry'},

        {name: 'Cowrie Petal Earring', color: 'Gold plated', id: '19', description: "Cowrie Petal Earring set in Gold plated jewelry wire.", price: '30', tag:"jewelry", category: 'jewelry'},
        
        {name: 'Cowrie Petal Earring', color: 'Gold plated', id: '20', description: "Cowrie Petal Earring set in Gold plated jewelry wire.", price: '30', tag:"jewelry", category: 'jewelry'},
        
        {name: 'Pearl and Gold earrings', color: 'Gold plated', id: '10', description: 'Gold plated earrings with pearls', price: '50', tag:"jewelry", category: 'jewelry'},
        
        {name: 'Baroque pearls and gold set', color: 'Gold plated', id: '9', description: "Earrings with Baroque pearls set in Gold plated jewelry wire.", price: '110', tag:"jewelry", category: 'jewelry'},

        // FALL COLLECTION

        {name: 'Todun Neon aso oke', color: 'Neon', id: '16', description: 'Our Todun Pants combine utility with the timeless elegance of Aso Oke, a handwoven fabric steeped in the rich traditions of southern Nigeria. Known for its vibrant hues and intricate patterns, Aso Oke tells stories of heritage and craftsmanship, woven into every thread. These pants offer both style and function, honoring the past while embracing modern practicality.', price: '112', tag:"fall", category: 'pants'},

        {name: 'Todun Purple aso oke', color: 'Purple', id: '11', description: 'Our Todun Pants combine utility with the timeless elegance of Aso Oke, a handwoven fabric steeped in the rich traditions of southern Nigeria. Known for its vibrant hues and intricate patterns, Aso Oke tells stories of heritage and craftsmanship, woven into every thread. These pants offer both style and function, honoring the past while embracing modern practicality.', price: '112', tag:"fall", category: 'pants'},

        {name: 'Todun Sanyan aso oke', color: 'Orange', id: '12', description: "Our Todun Pants combine utility with the timeless elegance of Aso Oke, a handwoven fabric steeped in the rich traditions of southern Nigeria. Known for its vibrant hues and intricate patterns, Aso Oke tells stories of heritage and craftsmanship, woven into every thread. These pants offer both style and function, honoring the past while embracing modern practicality.", price: '112', tag:"fall", category: 'pants'},
        
        {name: 'Todun Tassel aso oke', color: 'Red', id: '13', description: 'Our Todun Pants combine utility with the timeless elegance of Aso Oke, a handwoven fabric steeped in the rich traditions of southern Nigeria. Known for its vibrant hues and intricate patterns, Aso Oke tells stories of heritage and craftsmanship, woven into every thread. These pants offer both style and function, honoring the past while embracing modern practicality.', price: '112', tag:"fall", category: 'pants'},

        {name: 'Yosola Blue geometric gown', color: 'Blue', id: '14', description: 'Our Yosola Adire gown is a stunning fusion of contemporary style and West African artistry. Ethically dyed and crafted from soft, breathable cotton, this dress is a wardrobe essential that radiates elegance and cultural richness. This versatile yet sophisticated ,and bold print easily transitions from day to night is your new wardrobe staple.', price: '85', tag:"fall", category: 'dress'},

        {name: 'Yosola Black geometric gown', color: 'Black', id: '15', description: 'Our Yosola Adire gown is a stunning fusion of contemporary style and West African artistry. Ethically dyed and crafted from soft, breathable cotton, this dress is a wardrobe essential that radiates elegance and cultural richness. This versatile yet sophisticated ,and bold print easily transitions from day to night is your new wardrobe staple.', price: '85', tag:"fall", category: 'dress'},

        {name: 'Yosola Bubu: Geometric Midi Gown', color: 'Blue', id: '17', description: "Our Yosola Adire gown is a stunning fusion of contemporary style and West African artistry. Ethically dyed and crafted from soft, breathable cotton, this dress is a wardrobe essential that radiates elegance and cultural richness.This dress features a Vibrant blue color with geometric circle patterns, and a contrasting blush bib.", price: '85', tag: "fall",  category: 'dress'}, 

        {name: 'Yosola Bubu: Multicolored Gown', color: 'Multicolored', id: '18', description: "Our Yosola Adire gown is a stunning fusion of contemporary style and West African artistry. Ethically dyed and crafted from soft, breathable cotton, this dress is a wardrobe essential that radiates elegance and cultural richness.This dress features a Vibrant blue color with geometric circle patterns, and a contrasting blush bib.", price: '70', tag: "fall",  category: 'dress'}, 

    
    ]);
    return (
        <ProductItemsContext.Provider value={{products, setProducts}}>
            {children}
        </ProductItemsContext.Provider>
    )
}