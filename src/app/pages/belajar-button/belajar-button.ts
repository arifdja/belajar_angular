import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-belajar-button',
  imports: [CommonModule, Button],
  templateUrl: './belajar-button.html',
  styleUrl: './belajar-button.scss',
})
export class BelajarButton {
  onPrimaryClick() {
    alert('Primary button clicked!');
  }
}
