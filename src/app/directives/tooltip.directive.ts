import { Directive, Input, ElementRef, HostListener, ComponentRef, ViewContainerRef, Renderer2 } from '@angular/core';
import { TooltipComponent } from '../components/tooltip';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' | 'auto' = 'auto';
  @Input() tooltipTheme: 'dark' | 'light' = 'dark';
  @Input() tooltipDelay: number = 300;

  private tooltipComponent?: ComponentRef<TooltipComponent>;

  constructor(
    private el: ElementRef,
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent): void {
    if (this.tooltipText && !this.tooltipComponent) {
      this.showTooltip(event);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hideTooltip();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.tooltipComponent) {
      this.tooltipComponent.instance.updatePosition(event);
    }
  }

  private showTooltip(event: MouseEvent): void {
    this.tooltipComponent = this.viewContainer.createComponent(TooltipComponent);
    this.tooltipComponent.instance.content = this.tooltipText;
    this.tooltipComponent.instance.position = this.tooltipPosition;
    this.tooltipComponent.instance.theme = this.tooltipTheme;
    this.tooltipComponent.instance.delay = this.tooltipDelay;
    
    this.tooltipComponent.instance.show(event);
    
    // Append to body for proper positioning
    this.renderer.appendChild(document.body, this.tooltipComponent.location.nativeElement);
  }

  private hideTooltip(): void {
    if (this.tooltipComponent) {
      this.tooltipComponent.instance.hide();
      setTimeout(() => {
        if (this.tooltipComponent) {
          this.tooltipComponent.destroy();
          this.tooltipComponent = undefined;
        }
      }, 150);
    }
  }
}