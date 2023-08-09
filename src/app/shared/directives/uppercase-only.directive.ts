import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercaseOnly]'
})
export class UppercaseOnlyDirective {
  constructor(private el: ElementRef, private renderer: Renderer2, private ngControl: NgControl) {}

  @HostListener('input', ['$event']) onInput(event: any) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value.replace(/[^a-fA-F]/g, '').toUpperCase();
    this.renderer.setProperty(input, 'value', newValue);
    this.ngControl.control?.setValue(newValue);
  }
}
