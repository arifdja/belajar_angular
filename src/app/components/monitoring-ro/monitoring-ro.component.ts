import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from '../tooltip';
import { ButtonComponent } from '../button';

@Component({
  selector: 'app-monitoring-ro',
  standalone: true,
  imports: [CommonModule, TooltipComponent, ButtonComponent],
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

  onSaveClick(): void {
    console.log('Save button clicked');
    // Implementasi logika save di sini
  }
}
