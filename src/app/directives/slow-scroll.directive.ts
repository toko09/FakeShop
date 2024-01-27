import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSlowScroll]'
})
export class SlowScrollDirective {
  
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const translateY = 0.3 * scrollY + 'px'; 

    this.renderer.setStyle(this.el.nativeElement, 'transform', `translate3d(0, ${translateY}, 0)`);
  }
}
