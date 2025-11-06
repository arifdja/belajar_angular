import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent implements OnInit, OnDestroy {
  @Input() content: string = '';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' | 'auto' = 'auto';
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() maxWidth: string = '20rem';
  @Input() delay: number = 0;
  @Output() onShow = new EventEmitter<void>();
  @Output() onHide = new EventEmitter<void>();

  isVisible = false;
  actualPosition = { x: 0, y: 0 };
  private showTimeout?: number;
  private hideTimeout?: number;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Initialize component
  }

  ngOnDestroy(): void {
    this.clearTimeouts();
  }

  show(event: MouseEvent, content?: string): void {
    this.clearTimeouts();
    
    if (content) {
      this.content = content;
    }

    this.showTimeout = window.setTimeout(() => {
      this.isVisible = true;
      this.updatePosition(event);
      this.onShow.emit();
    }, this.delay);
  }

  hide(): void {
    this.clearTimeouts();
    
    this.hideTimeout = window.setTimeout(() => {
      this.isVisible = false;
      this.onHide.emit();
    }, 100);
  }

  updatePosition(event: MouseEvent): void {
    if (!this.isVisible) return;

    const offset = 10;
    let x = event.clientX + offset;
    let y = event.clientY - offset;

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get tooltip element dimensions (estimate if not available)
    const tooltipWidth = 320; // max-width estimate
    const tooltipHeight = 60; // estimated height

    // Adjust position to keep tooltip within viewport
    if (x + tooltipWidth > viewportWidth) {
      x = event.clientX - tooltipWidth - offset;
    }

    if (y < 0) {
      y = event.clientY + offset;
    }

    if (y + tooltipHeight > viewportHeight) {
      y = event.clientY - tooltipHeight - offset;
    }

    this.actualPosition = { x, y };
  }

  private clearTimeouts(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
  }

  getTooltipClasses(): string {
    const baseClasses = 'fixed z-50 px-3 py-2 text-xs rounded-lg shadow-lg pointer-events-none transition-opacity duration-200';
    const themeClasses = this.theme === 'dark' 
      ? 'bg-gray-900 text-white' 
      : 'bg-white text-gray-900 border border-gray-200';
    
    return `${baseClasses} ${themeClasses}`;
  }
}