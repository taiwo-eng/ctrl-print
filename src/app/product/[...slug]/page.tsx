"use client"
import React from 'react';

import { ProductDetail } from '../../components/ProductDetail';



export default function ProductDetailPage({ params }: { params: { slug: string } }) {
    return <ProductDetail params={params} />
}