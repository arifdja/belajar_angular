import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  
  constructor(private router: Router) {}

  userProfile = {
    name: 'John Developer',
    role: 'Full Stack Developer',
    location: 'Jakarta, Indonesia',
    email: 'john.developer@example.com',
    status: 'Available for hire',
    joinDate: new Date('2020-01-15'),
    bio: 'Passionate full-stack developer with expertise in Angular, Node.js, and cloud technologies. I love creating efficient, scalable solutions and staying up-to-date with the latest tech trends.',
    stats: {
      projects: 25,
      experience: 5,
      technologies: 12
    },
    skills: [
      { name: 'Angular', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Node.js', level: 80 },
      { name: 'Docker', level: 75 },
      { name: 'MongoDB', level: 70 },
      { name: 'AWS', level: 65 }
    ],
    recentProjects: [
      {
        name: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with Angular frontend and Node.js backend',
        status: 'Completed',
        technologies: ['Angular', 'Node.js', 'MongoDB', 'Docker'],
        startDate: new Date('2023-01-15')
      },
      {
        name: 'Task Management App',
        description: 'Real-time task management application with team collaboration features',
        status: 'In Progress',
        technologies: ['Angular', 'Socket.io', 'Express', 'PostgreSQL'],
        startDate: new Date('2023-06-01')
      },
      {
        name: 'Analytics Dashboard',
        description: 'Data visualization dashboard for business intelligence',
        status: 'Completed',
        technologies: ['Angular', 'D3.js', 'Python', 'FastAPI'],
        startDate: new Date('2022-09-10')
      },
      {
        name: 'Mobile Banking App',
        description: 'Secure mobile banking application with biometric authentication',
        status: 'Planning',
        technologies: ['Ionic', 'Angular', 'Node.js', 'JWT'],
        startDate: new Date('2023-08-01')
      }
    ]
  };

  getSkillBarColor(level: number): string {
    if (level >= 80) return 'bg-green-500';
    if (level >= 60) return 'bg-blue-500';
    if (level >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  getProjectStatusBadge(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'badge badge-success';
      case 'in progress':
        return 'badge badge-primary';
      case 'planning':
        return 'badge badge-warning';
      default:
        return 'badge bg-gray-100 text-gray-700';
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
