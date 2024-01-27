export interface Product {
id: number,
title: string,
description: string,
price: number,
discountPercentage: number,
rating: number,
stock: number,
brand: number,
category:  string,
thumbnail: string,
images: string[],
}
export interface AllProducts { 
    products: Product[],
    total: number,
    skip: number,
    limit: number,
}
export interface cartArray { 
    id: number[],
    quantity:number[] 
}
