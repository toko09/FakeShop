import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { SlideInterface } from 'src/app/imageSlider/types/slide.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.productsService.getCart()
  }
  // AllProducts$ = this.productsService.AllProducts;
  

  LandingCarousel: SlideInterface[] = [
    { url: '/assets/LandingCarouselImages/Eco Glass.webp', title: 'Eco Glass' },
    { url: '/assets/LandingCarouselImages/Kitchen Sponge.webp',title: 'Kitchen Sponge',},
    { url: '/assets/LandingCarouselImages/Seaweed Soap.webp',title: 'Seaweed Soap',},
    { url: '/assets/LandingCarouselImages/Stainless Steel Bottle.webp',title: 'Stainless Steel Bottle',},
    { url: '/assets/LandingCarouselImages/Wood Brush.webp',title: 'Wood Brush',},
  ];
  scrollCarousel: SlideInterface[] = [
    { url: '/assets/scrollCarousel/111.jpg', title: 'Eco Glass'},
    { url: '/assets/scrollCarousel/112.jpg',title: 'Kitchen Sponge'},
    { url: '/assets/scrollCarousel/113.jpg',title: 'Seaweed Soap'},
    { url: '/assets/scrollCarousel/114.jpg',title: 'Stainless Steel Bottle'},
    { url: '/assets/scrollCarousel/115.jpg', title: 'Wood Brush'},
    { url: '/assets/scrollCarousel/116.jpg', title: 'Eco Glass'},
    { url: '/assets/scrollCarousel/117.jpg',title: 'Kitchen Sponge'},
    { url: '/assets/scrollCarousel/118.jpg',title: 'Seaweed Soap'},
  ]
  currentIndex = 0;
  crslNum = 4;
  moveLeft() {
    this.currentIndex -= 1;
  }
  moveRight() {
    this.currentIndex = this.currentIndex + 1;
  }
  indexCounter(index: number): number {
    if (index > 4) {
      return index % 4;
    } else if (index < 0) {
      return index + 4;
    } else {
      return index;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth < 1200) {
      this.crslNum = window.innerWidth / 250;

    }
  }
  
  ngOnInit(): void {
    if (window.innerWidth < 1200) {
      this.crslNum = window.innerWidth / 250;
    }
    
    
    window.addEventListener('scroll', this.handlerOnScroll);
  }
  private handlerOnScroll = this.onScroll.bind(this);
  onScroll() {
    const element = this.el.nativeElement.querySelector('.zerowaste > *');
    const photo = this.el.nativeElement.querySelector('.zerowaste_photo >img');
    const photoDiv = this.el.nativeElement.querySelector('.zerowaste_photo');
    const rect = element.getBoundingClientRect();

    if (rect.top < 400) {
      this.renderer.setStyle(element, 'opacity', '1');
      this.renderer.setStyle(photo, 'opacity', '1');
      this.renderer.setStyle(photoDiv, 'right', '100px');
      window.removeEventListener('scroll', this.handlerOnScroll);
    }
  }
  onClick(right:boolean) { 
    const element = this.el.nativeElement.querySelector('.scrollCarousel');
    const scrollAmount = 220;
    if (right === true) {
      element.scrollLeft += scrollAmount;
    }
    else  { 
      element.scrollLeft -= scrollAmount;

    }
  }
}
