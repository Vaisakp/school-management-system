import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({
  selector: "[appUppercaseOnly]",
})
export class UppercaseOnlyDirective {
  constructor(private el: ElementRef) {}

  @HostListener("input", ["$event"]) onInput(event: any) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value.replace(/[^a-fA-F]/g, "");
    input.value = newValue.toUpperCase();
  }
}
