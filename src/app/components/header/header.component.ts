import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private productsService: ProductsService) { }
  cartNumber$ = this.productsService.cartNumber;
  searchText = '';
  onSearch() { 
    this.productsService.onSearch(this.searchText);
  }
}
