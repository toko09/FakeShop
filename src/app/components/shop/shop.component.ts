import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  constructor(private productsService: ProductsService) { }
  AllProducts$ = this.productsService.AllProducts;

}
