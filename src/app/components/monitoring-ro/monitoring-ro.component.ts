import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monitoring-ro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monitoring-ro.component.html',
  styleUrl: './monitoring-ro.component.scss'
})
export class MonitoringRoComponent {
  showTooltip = false;
  tooltipContent = '';
  tooltipPosition = { x: 0, y: 0 };

  onMouseEnter(event: MouseEvent, detail: string): void {
    this.tooltipContent = detail;
    this.showTooltip = true;
    this.updateTooltipPosition(event);
  }

  onMouseLeave(): void {
    this.showTooltip = false;
    this.tooltipContent = '';
  }

  onMouseMove(event: MouseEvent): void {
    if (this.showTooltip) {
      this.updateTooltipPosition(event);
    }
  }

  private updateTooltipPosition(event: MouseEvent): void {
    this.tooltipPosition = {
      x: event.clientX + 10,
      y: event.clientY - 10
    };
  }
}
