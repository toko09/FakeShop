import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'FakeShop';
  constructor(private productsService:ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts();
  }

 
}
