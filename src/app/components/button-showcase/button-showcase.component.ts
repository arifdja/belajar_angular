import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button';

@Component({
  selector: 'app-button-showcase',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="p-6 space-y-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Button Showcase</h2>
      
      <!-- Variants -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700">Variants</h3>
        <div class="flex flex-wrap gap-3">
          <app-button variant="primary" (clicked)="onButtonClick('primary')">Primary</app-button>
          <app-button variant="secondary" (clicked)="onButtonClick('secondary')">Secondary</app-button>
          <app-button variant="success" (clicked)="onButtonClick('success')">Success</app-button>
          <app-button variant="danger" (clicked)="onButtonClick('danger')">Danger</app-button>
          <app-button variant="warning" (clicked)="onButtonClick('warning')">Warning</app-button>
          <app-button variant="info" (clicked)="onButtonClick('info')">Info</app-button>
          <app-button variant="outline" (clicked)="onButtonClick('outline')">Outline</app-button>
          <app-button variant="ghost" (clicked)="onButtonClick('ghost')">Ghost</app-button>
        </div>
      </div>

      <!-- Sizes -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700">Sizes</h3>
        <div class="flex items-center gap-3">
          <app-button size="xs" variant="primary">Extra Small</app-button>
          <app-button size="sm" variant="primary">Small</app-button>
          <app-button size="md" variant="primary">Medium</app-button>
          <app-button size="lg" variant="primary">Large</app-button>
          <app-button size="xl" variant="primary">Extra Large</app-button>
        </div>
      </div>

      <!-- With Icons -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700">With Icons</h3>
        <div class="flex flex-wrap gap-3">
          <app-button variant="primary" icon="save" (clicked)="onSaveClick()">Save</app-button>
          <app-button variant="success" icon="check">Complete</app-button>
          <app-button variant="danger" icon="delete">Delete</app-button>
          <app-button variant="outline" icon="edit">Edit</app-button>
          <app-button variant="secondary" icon="download">Download</app-button>
          <app-button variant="info" icon="search">Search</app-button>
        </div>
      </div>

      <!-- States -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700">States</h3>
        <div class="flex gap-3">
          <app-button variant="primary" [disabled]="true">Disabled</app-button>
          <app-button variant="primary" [loading]="isLoading" (clicked)="toggleLoading()">
            {{ isLoading ? 'Loading...' : 'Click to Load' }}
          </app-button>
          <app-button variant="primary" [fullWidth]="false">Normal Width</app-button>
        </div>
      </div>

      <!-- Full Width -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700">Full Width</h3>
        <app-button variant="primary" [fullWidth]="true" icon="save">Full Width Button</app-button>
      </div>

      <!-- Icon Positions -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700">Icon Positions</h3>
        <div class="flex gap-3">
          <app-button variant="primary" icon="arrow-left" iconPosition="left">Previous</app-button>
          <app-button variant="primary" icon="arrow-right" iconPosition="right">Next</app-button>
        </div>
      </div>

      <!-- Action Log -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700">Action Log</h3>
        <div class="bg-gray-100 p-4 rounded-lg max-h-32 overflow-y-auto">
          <div *ngFor="let action of actionLog" class="text-sm text-gray-600">
            {{ action }}
          </div>
          <div *ngIf="actionLog.length === 0" class="text-sm text-gray-500 italic">
            Click buttons to see actions...
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ButtonShowcaseComponent {
  isLoading = false;
  actionLog: string[] = [];

  onButtonClick(variant: string): void {
    this.addToLog(`${variant} button clicked`);
  }

  onSaveClick(): void {
    this.addToLog('Save button clicked - performing save operation');
  }

  toggleLoading(): void {
    this.isLoading = true;
    this.addToLog('Loading started...');
    
    setTimeout(() => {
      this.isLoading = false;
      this.addToLog('Loading completed!');
    }, 2000);
  }

  private addToLog(action: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.actionLog.unshift(`[${timestamp}] ${action}`);
    
    // Keep only last 10 actions
    if (this.actionLog.length > 10) {
      this.actionLog = this.actionLog.slice(0, 10);
    }
  }
}