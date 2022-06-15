import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appChangeBg]',
})
export class ChangeBgDirective {
  @Input() isCorrect: Boolean = false;
  constructor(private el: ElementRef, private render: Renderer2) {}
  @HostListener('click') answer() {
    if (this.isCorrect) {
      this.render.setStyle(this.el.nativeElement, 'background', 'green');
      this.render.setStyle(this.el.nativeElement, 'color', '#fff');
      this.render.setStyle(this.el.nativeElement, 'border', '2px solid grey');

      setTimeout(() => {
        this.render.removeStyle(this.el.nativeElement, 'background');
        this.render.removeStyle(this.el.nativeElement, 'color');
        this.render.removeStyle(this.el.nativeElement, 'border');
      }, 1500);
    } else {
      this.render.setStyle(this.el.nativeElement, 'background', 'red');
      this.render.setProperty(this.el.nativeElement, 'button', 'disable');
      this.render.setStyle(this.el.nativeElement, 'color', '#fff');
      this.render.setStyle(this.el.nativeElement, 'border', '2px solid grey');
    }
  }
}
