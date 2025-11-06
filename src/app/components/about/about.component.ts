import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/home']);
  }

  title = 'About Our Project';
  description = 'This is an Angular 18 application built with Docker for development and production.';
  
  features = [
    {
      name: 'Angular 18',
      description: 'Latest version with standalone components'
    },
    {
      name: 'Docker Setup',
      description: 'Consistent development environment'
    },
    {
      name: 'TypeScript 5.5',
      description: 'Strong typing and modern JavaScript features'
    }
  ];

  team = [
    { name: 'Developer 1', role: 'Frontend Developer' },
    { name: 'Developer 2', role: 'Backend Developer' },
    { name: 'Developer 3', role: 'DevOps Engineer' }
  ];
}
