import { Component, Input} from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { AllProducts, Product } from '../../types/products';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() allProducts!: AllProducts;
  @Input() cartProducts: Product[] = [] 
  constructor(private productsService: ProductsService) { }
  addToCart(id: number) {
    this.productsService.addToCart(id)
  }


}
