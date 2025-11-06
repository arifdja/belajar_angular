import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from '../tooltip';

@Component({
  selector: 'app-monitoring-ro',
  standalone: true,
  imports: [CommonModule, TooltipComponent],
  templateUrl: './monitoring-ro.component.html',
  styleUrl: './monitoring-ro.component.scss'
})
export class MonitoringRoComponent {
  @ViewChild(TooltipComponent) tooltip!: TooltipComponent;

  onMouseEnter(event: MouseEvent, detail: string): void {
    this.tooltip.show(event, detail);
  }

  onMouseLeave(): void {
    this.tooltip.hide();
  }

  onMouseMove(event: MouseEvent): void {
    this.tooltip.updatePosition(event);
  }
}
