import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight: string = 'red';
    
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  @HostListener('mouseover')
  onHighlight() {
    this.renderer.setStyle(this.el.nativeElement, 'border-color', this.appHighlight);
  }
  @HostListener('mouseleave')
  onRemoveHighlight() {
    this.renderer.setStyle(this.el.nativeElement, 'border-color', 'gray');
  }
}
