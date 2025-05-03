import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMyDirective]'
})
export class MyDirective implements AfterViewInit {

  constructor(private el: ElementRef) { 
  }

  ngAfterViewInit(): void {
    console.log("Directive inside: " + Object.entries(this.el.nativeElement.childNodes));
  }

}
