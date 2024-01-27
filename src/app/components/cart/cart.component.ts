import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { Product, cartArray } from '../../types/products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private productsService: ProductsService) { 
    productsService.getCart()
  }
  cartProducts$ = this.productsService.cartProducts;
  cArray$ = this.productsService.cArray;
  cartNumber$ = this.productsService.cartNumber;
  vm$ = combineLatest([
    this.cartProducts$,
    this.cArray$,
    this.cartNumber$
  ]).pipe(
    map((array) => {
      const [cartProducts, cArray,cartNumber] = array;
      return {
        cartProducts,
        cArray,
        cartNumber
      };
    })
  );

  deleteFromCart(id: number) { 
    this.productsService.deleteFromCart(id)

  }
  getQuantity(array:cartArray, id :number) { 
    // console.log('quantity' + id, array)
    const index = array.id.indexOf(id)
    return array.quantity[index]
  }
  countPrice(prods: Product[], array: cartArray) {
    let sum: number = 0;
    for (let i in prods) { 
      const indexInArr = array.id.indexOf(prods[i].id)
      sum += prods[i].price * array.quantity[indexInArr]
    }
    return sum

  }

}
