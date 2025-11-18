import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input() label = 'Button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() type: 'button' | 'submit' = 'button';

  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}
