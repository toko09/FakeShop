import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AllProducts, Product, cartArray } from '../types/products';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl = 'https://dummyjson.com';

  cartArray: cartArray = { id: [0], quantity: [0] };

  sum(arr: number[]): number {
    let s: number = 0;
    if (arr === undefined) { console.log('sum indefined') }
    else { 
      for (let i of arr) {
        s += i;
      }
    }
    return s;
  }

  private cArray$ = new BehaviorSubject<cartArray>({ id: [0], quantity: [0] });

  private AllProducts$ = new BehaviorSubject<AllProducts>({
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
  });
  private cartProducts$ = new BehaviorSubject<Product[]>([]);

  private cartNumber$ = new BehaviorSubject<number>(
    this.sum(this.cartArray.quantity)
  );

  get AllProducts() {
    return this.AllProducts$.asObservable();
  }
  get cartProducts() {
    return this.cartProducts$.asObservable();
  }
  get cartNumber() {
    return this.cartNumber$.asObservable();
  }
  get cArray() {
    return this.cArray$.asObservable();
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  getProducts() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const searchText = params['q'];
      if (searchText) {
        this.http
          .get<AllProducts>(`${this.baseUrl}/products/search`, {
            params: { q: searchText },
          })
          .subscribe((response) => {
            this.AllProducts$.next(response);
            const storedCart = localStorage.getItem('cart');
            this.cartArray = storedCart ? JSON.parse(storedCart) : [];
            this.cartNumber$.next(this.sum(this.cartArray.quantity));
          });
      } else {
        this.http
          .get<AllProducts>(`${this.baseUrl}/products`)
          .subscribe((response) => {
            this.AllProducts$.next(response);
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
              this.cartArray = storedCart ? JSON.parse(storedCart) : [];
              this.cartNumber$.next(this.sum(this.cartArray.quantity));
            } else {
              this.cartNumber$.next(0);
            }
          });
      }
    });
  }

  addToCart(idCart: number) {
    // console.log('add to cart'  +  this.cartArray.id)
    // if (this.cartArray.id !== undefined) {
    //   console.log('problem')
    // }
    if (this.cartArray.id.includes(idCart)) {
      for (let i = 0; i < this.cartArray.id.length; i++) {
        if (this.cartArray.id[i] === idCart) {
          this.cartArray.quantity[i] += 1;
        }
      }
    } else if (!this.cartArray.id.includes(idCart)) {
      console.log('adding new item to cart')
      this.cartArray.id.push(idCart);
      this.cartArray.quantity.push(1);
    }
    localStorage.setItem('cart', JSON.stringify(this.cartArray));
    this.cartNumber$.next(this.sum(this.cartArray.quantity));
    this.cArray$.next(this.cartArray);
  }
  deleteFromCart(idCart: number) {
    const index = this.cartArray.id.indexOf(idCart);

    if (this.cartArray.quantity[index] > 1) {
      this.cartArray.quantity[index] -= 1;
    } else {
      this.cartArray.id.splice(index, 1);
      this.cartArray.quantity.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(this.cartArray));
    this.cartProducts$.next(
      this.AllProducts$.getValue().products.filter((p) =>
        this.cartArray.id.includes(p.id)
      )
    );
    this.cartNumber$.next(this.sum(this.cartArray.quantity));
    this.cArray$.next(this.cartArray);
  }
  getCart() {
    console.log('getCart');
    this.http
      .get<AllProducts>(`${this.baseUrl}/products`)
      .subscribe((response) => {
        this.AllProducts$.next(response);
        if (this.sum(this.cartArray.quantity) == 0) {
          const storedCart = localStorage.getItem('cart');
          this.cartArray = storedCart ? JSON.parse(storedCart) : [];
          this.cartNumber$.next(this.sum(this.cartArray.quantity));
          this.cArray$.next(this.cartArray);
          // console.log(this.sum(this.cartArray.quantity))
        }

        this.cartProducts$.next(
          this.AllProducts$.getValue().products.filter((p) =>
            this.cartArray.id.includes(p.id)
          )
        );
      });
  }
  onSearch(query: string) {
    this.router.navigate(['shop/search'], { queryParams: { q: query } });

    this.http
      .get<AllProducts>(`${this.baseUrl}/products/search`, {
        params: { q: query },
      })
      .subscribe((response) => {
        this.AllProducts$.next(response);
      });
  }
}
