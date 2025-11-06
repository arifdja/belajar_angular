import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'Welcome to Angular Development with Docker!';
  features = [
    'Angular Latest Version',
    'Docker Development Environment',
    'Hot Reload Support',
    'Production Ready Build',
    'Nginx Configuration'
  ];
}