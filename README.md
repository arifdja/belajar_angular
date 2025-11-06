# Belajar Angular dengan Docker

Project Angular 18 dengan setup Docker untuk development dan production. Menggunakan Angular CLI 18, Node.js 20, dan Docker Compose untuk environment yang konsisten.

## 📁 Struktur Project

```
belajar_angular/
├── 🐳 Docker Configuration
│   ├── docker-compose.yml          # Development environment
│   ├── docker-compose.prod.yml     # Production environment
│   ├── Dockerfile.dev               # Development container
│   ├── Dockerfile.prod              # Production container
│   └── .dockerignore                # Files to exclude from Docker context
│
├── 📦 Angular Configuration
│   ├── angular.json                 # Angular workspace configuration
│   ├── package.json                 # Dependencies dan npm scripts
│   ├── tsconfig.json                # TypeScript configuration (base)
│   ├── tsconfig.app.json            # TypeScript config for app
│   └── tsconfig.spec.json           # TypeScript config for tests
│
├── 🚀 Source Code (src/)
│   ├── index.html                   # Main HTML template
│   ├── main.ts                      # Application entry point
│   ├── styles.scss                  # Global styles
│   │
│   ├── app/                         # Application core
│   │   ├── app.component.*          # Root component
│   │   ├── app.config.ts            # Application configuration
│   │   ├── app.routes.ts            # Routing configuration
│   │   │
│   │   ├── components/              # Feature components
│   │   │   ├── home/                # Home page component
│   │   │   │   ├── home.component.ts
│   │   │   │   ├── home.component.html
│   │   │   │   └── home.component.scss
│   │   │   └── not-found/           # 404 error component
│   │   │       ├── not-found.component.ts
│   │   │       ├── not-found.component.html
│   │   │       └── not-found.component.scss
│   │   │
│   │   ├── models/                  # Data models & interfaces
│   │   │   ├── index.ts             # Export barrel
│   │   │   └── user.model.ts        # User data model
│   │   │
│   │   └── services/                # Business logic services
│   │       └── user.service.ts      # User-related operations
│   │
│   ├── assets/                      # Static assets (images, fonts, etc.)
│   └── environments/                # Environment configurations
│       ├── environment.ts           # Development environment
│       └── environment.prod.ts      # Production environment
│
├── 🌐 Web Server Configuration
│   └── nginx/
│       ├── nginx.conf               # Nginx configuration for production
│       └── 50x.html                 # Error page template
│
├── 🛠️ Development Tools
│   ├── dev.sh                       # Development helper script
│   ├── .gitignore                   # Git ignore rules
│   └── e2e/                         # End-to-end tests
│
└── 📚 Documentation
    ├── README.md                    # This file
    └── QUICKSTART.md                # Quick start guide
```

## 🔧 File Utama dan Fungsinya

### **🐳 Docker Files**

#### `docker-compose.yml`
Development environment dengan hot reload dan volume mapping.
```yaml
services:
  angular-app:
    build:
      dockerfile: Dockerfile.dev    # Development container
    ports:
      - "4200:4200"                # Angular dev server
    volumes:
      - ./src:/app/src             # Hot reload untuk source code
```

#### `Dockerfile.dev`
Container untuk development dengan Angular CLI 18.
```dockerfile
FROM node:20-alpine
RUN npm install -g @angular/cli@18
# Hot reload dan development tools
```

#### `Dockerfile.prod`
Multi-stage build untuk production dengan Nginx.
```dockerfile
FROM node:20-alpine AS builder
# Build optimized production bundle
FROM nginx:alpine
# Serve dengan Nginx
```

### **📦 Angular Configuration**

#### `angular.json`
Workspace configuration untuk Angular 18 dengan application builder.
```json
{
  "projects": {
    "belajar-angular": {
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application"
        }
      }
    }
  }
}
```

#### `package.json`
Dependencies Angular 18 dan npm scripts.
```json
{
  "dependencies": {
    "@angular/core": "^18.0.0",
    "@angular/cli": "^18.0.0"
  },
  "scripts": {
    "docker:dev": "docker-compose up",
    "docker:build": "docker-compose -f docker-compose.prod.yml up --build"
  }
}
```

#### `tsconfig.json`
TypeScript configuration untuk Angular 18.
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "moduleResolution": "bundler",
    "strict": true
  }
}
```

### **🚀 Source Code**

#### `src/main.ts`
Application entry point dengan standalone bootstrapping.
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err: any) => console.error(err));
```

#### `src/app/app.config.ts`
Application configuration dengan providers.
```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes)
  ]
};
```

#### `src/app/app.routes.ts`
Routing configuration dengan lazy loading.
```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) 
  }
];
```

#### `src/app/app.component.ts`
Root component sebagai entry point UI.
```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'belajar-angular';
}
```

### **🎨 Styling**

#### `src/styles.scss`
Global styles dengan responsive design.
```scss
// Bootstrap-like container styles
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
```

### **🔧 Environment Configuration**

#### `src/environments/environment.ts`
Development environment settings.
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'Belajar Angular Development'
};
```

#### `src/environments/environment.prod.ts`
Production environment settings.
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api',
  appName: 'Belajar Angular'
};
```

## � Urutan Eksekusi Kode Program (Code Flow)

### **Step-by-Step: Dari Start hingga Halaman Utama Ditampilkan**

#### **1. Entry Point - `src/main.ts`** 
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err: any) => console.error(err));
```
**Proses:**
- Browser memuat file ini sebagai entry point aplikasi
- Import semua dependencies yang diperlukan
- **`bootstrapApplication()`** memulai aplikasi Angular dengan komponen root `AppComponent`
- `appConfig` berisi konfigurasi aplikasi (providers, routing, dll)

#### **2. Application Configuration - `src/app/app.config.ts`**
```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes)
  ]
};
```
**Proses:**
- Menyediakan **Zone.js** untuk change detection Angular
- Menyediakan **Router** dengan konfigurasi routes
- Mengatur providers yang dibutuhkan untuk dependency injection

#### **3. Routing Configuration - `src/app/app.routes.ts`**
```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: '**', loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
```
**Proses:**
- URL kosong (`''`) → otomatis redirect ke `/home`
- URL `/home` → lazy load `HomeComponent` (dimuat sesuai kebutuhan)
- URL tidak dikenal (`'**'`) → lazy load `NotFoundComponent` (404 fallback)

#### **4. Root Component - `src/app/app.component.ts`**
```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'belajar-angular';
}
```
**Proses:**
- Komponen ini menjadi **root container** untuk seluruh aplikasi
- Import `RouterOutlet` untuk menampilkan komponen berdasarkan route
- Property `title` akan ditampilkan di template sebagai judul aplikasi

#### **5. Root Template - `src/app/app.component.html`**
```html
<div class="container">
  <header>
    <nav class="navbar">
      <h1>{{ title }}</h1>  <!-- Menampilkan "belajar-angular" -->
    </nav>
  </header>
  
  <main>
    <router-outlet></router-outlet>  <!-- Tempat komponen route ditampilkan -->
  </main>
  
  <footer>
    <p>&copy; 2025 Belajar Angular</p>
  </footer>
</div>
```
**Proses:**
- Menampilkan layout dasar aplikasi (header, main, footer)
- `{{ title }}` melakukan data binding untuk menampilkan nilai dari `AppComponent.title`
- `<router-outlet>` adalah placeholder tempat komponen route akan dirender

#### **6. Home Component - `src/app/components/home/home.component.ts`**
```typescript
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
```
**Proses:**
- Karena route `/home` dipanggil, komponen ini di-lazy load secara dinamis
- Menyediakan data untuk template (title dan features array)
- Class ini mengatur state dan behavior untuk halaman home

#### **7. Home Template - `src/app/components/home/home.component.html`**
```html
<div class="home-container">
  <div class="hero-section">
    <h1>{{ title }}</h1>  <!-- Welcome message -->
    <p>This is a complete Angular development environment with Docker setup.</p>
  </div>

  <div class="features-section">
    <h2>Features</h2>
    <div class="features-grid">
      <div class="feature-card" *ngFor="let feature of features">  <!-- Loop array features -->
        <h3>{{ feature }}</h3>
        <p>Configured and ready to use</p>
      </div>
    </div>
  </div>
</div>
```

### **🔄 Complete Flow Execution:**

```
1. Browser memuat index.html
   ↓
2. main.ts dieksekusi → bootstrapApplication()
   ↓
3. AppComponent dimuat sebagai root component
   ↓
4. app.config.ts menyediakan providers (Router, Zone.js)
   ↓
5. Router mengecek URL saat ini ('')
   ↓
6. Route '' redirect ke '/home'
   ↓
7. Route '/home' trigger lazy loading HomeComponent
   ↓
8. HomeComponent dimuat dan dirender di <router-outlet>
   ↓
9. Template home.component.html ditampilkan dengan data dari component
   ↓
10. Halaman utama berhasil ditampilkan! 🎉
```

### **🎯 Hasil Akhir yang Ditampilkan:**
User akan melihat halaman dengan struktur:
- **Header:** Navbar dengan title "belajar-angular" 
- **Main Content:** Welcome message, daftar features dalam grid, dan getting started guide
- **Footer:** Copyright 2025 Belajar Angular

### **🚀 Keunggulan Angular 18 dalam Flow ini:**
- ✅ **Standalone Components** - Tidak memerlukan NgModules, langsung import dependencies
- ✅ **Lazy Loading** - Komponen dimuat sesuai kebutuhan untuk performa optimal
- ✅ **Application Builder** - Build process yang lebih cepat dari browser builder
- ✅ **Modern TypeScript** - Support TypeScript 5.5 untuk type safety
- ✅ **Zone.js Optimization** - Event coalescing untuk performa change detection

### **📊 Performance Metrics Flow:**
- **Initial Load**: ~1.7 seconds untuk bootstrap aplikasi
- **Bundle Size**: 91.46 kB initial bundle (polyfills + main + styles)
- **Lazy Loading**: Home component (5.81 kB) dimuat setelah route resolution
- **Change Detection**: Zone.js mengoptimasi dengan event coalescing

## 🆕 Membuat Halaman Baru (Step-by-Step Guide)

### **🎯 Scenario: Membuat Halaman "About"**

#### **Step 1: Buat Component Baru**

**Opsi A: Menggunakan Angular CLI (Dalam Container)**
```bash
# Akses container shell
./dev.sh shell
# atau
docker-compose exec angular-app sh

# Generate component baru
ng generate component components/about --standalone

# Atau dengan shorthand
ng g c components/about --standalone
```

**Opsi B: Manual Creation (Tanpa CLI)**
```bash
# Buat folder untuk component
mkdir -p src/app/components/about

# Buat files component
touch src/app/components/about/about.component.ts
touch src/app/components/about/about.component.html
touch src/app/components/about/about.component.scss
```

#### **Step 2: Implement Component Code**

**File: `src/app/components/about/about.component.ts`**
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
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
```

**File: `src/app/components/about/about.component.html`**
```html
<div class="about-container">
  <div class="hero-section">
    <h1>{{ title }}</h1>
    <p class="lead">{{ description }}</p>
  </div>

  <div class="features-section">
    <h2>Key Features</h2>
    <div class="features-grid">
      <div class="feature-card" *ngFor="let feature of features">
        <h3>{{ feature.name }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>
  </div>

  <div class="team-section">
    <h2>Our Team</h2>
    <div class="team-grid">
      <div class="team-member" *ngFor="let member of team">
        <h4>{{ member.name }}</h4>
        <p>{{ member.role }}</p>
      </div>
    </div>
  </div>

  <div class="action-section">
    <button type="button" (click)="goBack()" class="btn btn-secondary">
      ← Back to Home
    </button>
  </div>
</div>
```

**File: `src/app/components/about/about.component.scss`**
```scss
.about-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  .hero-section {
    text-align: center;
    margin-bottom: 3rem;

    h1 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 1rem;
    }

    .lead {
      font-size: 1.2rem;
      color: #666;
      max-width: 600px;
      margin: 0 auto;
    }
  }

  .features-section,
  .team-section {
    margin-bottom: 3rem;

    h2 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
      text-align: center;
      color: #333;
    }
  }

  .features-grid,
  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .feature-card,
  .team-member {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #e9ecef;

    h3, h4 {
      color: #495057;
      margin-bottom: 0.5rem;
    }

    p {
      color: #6c757d;
      margin: 0;
    }
  }

  .action-section {
    text-align: center;
    margin-top: 3rem;

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      text-decoration: none;
      display: inline-block;

      &.btn-secondary {
        background-color: #6c757d;
        color: white;

        &:hover {
          background-color: #5a6268;
        }
      }
    }
  }
}

// Responsive design
@media (max-width: 768px) {
  .about-container {
    padding: 1rem;

    .hero-section h1 {
      font-size: 2rem;
    }

    .features-grid,
    .team-grid {
      grid-template-columns: 1fr;
    }
  }
}
```

#### **Step 3: Tambahkan Method untuk Navigation (Optional)**

**Update `src/app/components/about/about.component.ts`**
```typescript
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
  // ... existing code ...

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/home']);
  }
}
```

#### **Step 4: Tambahkan Route untuk Halaman Baru**

**Update `src/app/app.routes.ts`**
```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'about', 
    loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent) 
  },
  { 
    path: '**', 
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent) 
  }
];
```

#### **Step 5: Tambahkan Navigation Link**

**Update `src/app/app.component.html`** untuk menambahkan navigasi:
```html
<div class="container">
  <header>
    <nav class="navbar">
      <h1>{{ title }}</h1>
      <div class="nav-links">
        <a routerLink="/home" routerLinkActive="active">Home</a>
        <a routerLink="/about" routerLinkActive="active">About</a>
      </div>
    </nav>
  </header>
  
  <main>
    <router-outlet></router-outlet>
  </main>
  
  <footer>
    <p>&copy; 2025 Belajar Angular</p>
  </footer>
</div>
```

**Update `src/app/app.component.ts`** untuk import RouterLink:
```typescript
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'belajar-angular';
}
```

**Update `src/app/app.component.scss`** untuk styling navigation:
```scss
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 1rem 0;

  .navbar {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;

    h1 {
      margin: 0;
      color: #333;
    }

    .nav-links {
      display: flex;
      gap: 1rem;

      a {
        text-decoration: none;
        color: #495057;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        transition: all 0.3s ease;

        &:hover {
          background-color: #e9ecef;
        }

        &.active {
          background-color: #007bff;
          color: white;
        }
      }
    }
  }
}

main {
  flex: 1;
  padding: 2rem 0;
}

footer {
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 1rem 0;
  text-align: center;
  color: #6c757d;

  p {
    margin: 0;
  }
}

// Responsive design
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;

    .nav-links {
      justify-content: center;
    }
  }
}
```

#### **Step 6: Test Halaman Baru**

```bash
# Restart development server jika diperlukan
./dev.sh restart

# Atau restart container
docker-compose restart

# Access aplikasi
open http://localhost:4200
```

### **🧪 Testing Checklist**

- ✅ **Route Navigation**: Pastikan `/about` dapat diakses
- ✅ **Lazy Loading**: Component dimuat sesuai kebutuhan
- ✅ **Navigation Links**: Link aktif dan bekerja dengan baik
- ✅ **Responsive Design**: Tampilan baik di berbagai ukuran layar
- ✅ **Back Navigation**: Button back berfungsi
- ✅ **Hot Reload**: Perubahan ter-reload otomatis

### **🔄 Pattern untuk Halaman Lainnya**

Untuk membuat halaman lain (Contact, Services, dll), ikuti pattern yang sama:

1. **Generate/Create Component**
2. **Implement TypeScript Logic**
3. **Create HTML Template**
4. **Add SCSS Styling**
5. **Add Route Configuration**
6. **Update Navigation**
7. **Test & Verify**

### **📁 Struktur Setelah Penambahan About Page**

```
src/app/components/
├── home/
│   ├── home.component.ts
│   ├── home.component.html
│   └── home.component.scss
├── about/              ← New page
│   ├── about.component.ts
│   ├── about.component.html
│   └── about.component.scss
└── not-found/
    ├── not-found.component.ts
    ├── not-found.component.html
    └── not-found.component.scss
```

### **� Advanced Features (Optional)**

#### **A. Route Parameters**
```typescript
// Route dengan parameter
{ path: 'user/:id', loadComponent: () => import('./components/user/user.component').then(m => m.UserComponent) }

// Dalam component
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const userId = this.route.snapshot.paramMap.get('id');
}
```

#### **B. Route Guards**
```typescript
// Protect route dengan guard
{ 
  path: 'admin', 
  loadComponent: () => import('./components/admin/admin.component').then(m => m.AdminComponent),
  canActivate: [AuthGuard]
}
```

#### **C. Query Parameters**
```typescript
// Navigate dengan query params
this.router.navigate(['/search'], { queryParams: { q: 'angular' } });

// Read query params
this.route.queryParams.subscribe(params => {
  const searchQuery = params['q'];
});
```

### **💡 Best Practices untuk Halaman Baru**

1. **Naming Convention**: Gunakan kebab-case untuk nama component
2. **Standalone Components**: Selalu gunakan standalone: true untuk Angular 18
3. **Lazy Loading**: Gunakan dynamic import untuk performa optimal
4. **Responsive Design**: Pastikan halaman responsive di semua device
5. **SEO Friendly**: Tambahkan meta tags jika diperlukan
6. **Error Handling**: Handle error states dalam component
7. **Loading States**: Tampilkan loading indicator untuk async operations
8. **Accessibility**: Pastikan halaman accessible (ARIA labels, keyboard navigation)

## 🎨 Integrasi Tailwind CSS

### **🚀 Setup Tailwind CSS dengan Angular 18 + Docker**

#### **Step 1: Install Tailwind CSS Dependencies**

**Dalam Docker Container:**
```bash
# Akses container shell
./dev.sh shell
# atau
docker-compose exec angular-app sh

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Atau Update package.json dan rebuild container:**

Update `package.json`:
```json
{
  "devDependencies": {
    "@angular-devkit/build-angular": "^18.2.0",
    "@angular/cli": "^18.2.0",
    "@angular/compiler-cli": "^18.2.0",
    "@types/jasmine": "~5.1.0",
    "jasmine-core": "~5.1.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "typescript": "~5.5.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16"
  }
}
```

#### **Step 2: Configure Tailwind CSS**

**File: `tailwind.config.js`**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/app/**/*.{html,ts,scss}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  darkMode: 'class', // Enable dark mode
}
```

**File: `postcss.config.js`**
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

#### **Step 3: Update Global Styles**

**File: `src/styles.scss`**
```scss
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Custom CSS Components */
@layer components {
  .btn {
    @apply inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  .btn-primary {
    @apply bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
  }

  .btn-secondary {
    @apply bg-secondary-200 text-secondary-900 hover:bg-secondary-300 focus:ring-secondary-500;
  }

  .btn-outline {
    @apply border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500;
  }

  .card {
    @apply bg-white rounded-lg shadow-md border border-gray-200 p-6;
  }

  .card-header {
    @apply mb-4 pb-2 border-b border-gray-200;
  }

  .input-field {
    @apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500;
  }

  .navbar-link {
    @apply text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors;
  }

  .navbar-link-active {
    @apply bg-primary-100 text-primary-700;
  }
}

/* Custom Base Styles */
@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply font-sans text-gray-900 bg-gray-50;
  }

  h1 {
    @apply text-3xl font-bold tracking-tight;
  }

  h2 {
    @apply text-2xl font-semibold tracking-tight;
  }

  h3 {
    @apply text-xl font-semibold;
  }

  p {
    @apply text-gray-600 leading-relaxed;
  }

  a {
    @apply text-primary-600 hover:text-primary-700 transition-colors;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  body {
    @apply bg-gray-900 text-gray-100;
  }

  .card {
    @apply bg-gray-800 border-gray-700;
  }

  .card-header {
    @apply border-gray-700;
  }

  p {
    @apply text-gray-300;
  }
}
```

#### **Step 4: Rebuild Docker Container**

```bash
# Stop container
docker-compose down

# Rebuild dengan Tailwind dependencies
docker-compose up --build

# Atau menggunakan helper script
./dev.sh clean
./dev.sh start
```

### **🎨 Tailwind CSS Utilities yang Sering Digunakan**

#### **Layout & Spacing:**
```html
<!-- Container dan spacing -->
<div class="max-w-7xl mx-auto px-4 py-8">
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<div class="flex items-center justify-between">

<!-- Responsive breakpoints -->
<div class="block md:hidden">Mobile only</div>
<div class="hidden md:block">Desktop only</div>
```

#### **Typography:**
```html
<h1 class="text-4xl font-bold text-gray-900">
<p class="text-lg text-gray-600 leading-relaxed">
<span class="text-sm font-medium text-primary-600">
```

#### **Colors & Backgrounds:**
```html
<div class="bg-white text-gray-900">
<div class="bg-gradient-to-r from-primary-500 to-blue-600">
<button class="bg-primary-600 hover:bg-primary-700 text-white">
```

#### **Borders & Shadows:**
```html
<div class="border border-gray-200 rounded-lg shadow-md">
<div class="shadow-lg hover:shadow-xl transition-shadow">
```

#### **Animations & Transitions:**
```html
<div class="transition-all duration-300 ease-in-out">
<div class="animate-fade-in">
<button class="transform hover:scale-105 transition-transform">
```

### **📱 Responsive Design dengan Tailwind**

```html
<!-- Mobile-first approach -->
<div class="
  w-full          <!-- Mobile: full width -->
  md:w-1/2        <!-- Tablet: half width -->
  lg:w-1/3        <!-- Desktop: one-third width -->
  xl:w-1/4        <!-- Large desktop: one-fourth width -->
">

<!-- Responsive text sizes -->
<h1 class="text-2xl md:text-4xl lg:text-6xl">

<!-- Responsive padding -->
<div class="p-4 md:p-8 lg:p-12">

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### **🌙 Dark Mode Support**

```html
<!-- Dark mode classes -->
<div class="bg-white dark:bg-gray-900">
<p class="text-gray-900 dark:text-gray-100">
<button class="bg-primary-600 dark:bg-primary-500">

<!-- Toggle dark mode (dalam component) -->
<button (click)="toggleDarkMode()" 
        class="p-2 rounded-md bg-gray-200 dark:bg-gray-700">
  <svg class="w-5 h-5" [class.hidden]="!isDarkMode">🌙</svg>
  <svg class="w-5 h-5" [class.hidden]="isDarkMode">☀️</svg>
</button>
```

### **🔧 Tailwind CSS Plugins**

Install additional plugins untuk functionality lebih:
```bash
npm install -D @tailwindcss/forms @tailwindcss/typography @tailwindcss/aspect-ratio
```

**Usage:**
```html
<!-- Forms plugin -->
<input class="form-input rounded-md border-gray-300">
<select class="form-select">

<!-- Typography plugin -->
<article class="prose lg:prose-xl">
  <!-- Rich text content -->
</article>

<!-- Aspect ratio plugin -->
<div class="aspect-w-16 aspect-h-9">
  <iframe src="..."></iframe>
</div>
```

### **⚡ Performance Optimization**

#### **Purge Unused CSS:**
Tailwind secara otomatis removes unused CSS dalam production build.

#### **Bundle Size Analysis:**
```bash
# Check bundle size setelah Tailwind
ng build --stats-json
npx webpack-bundle-analyzer dist/belajar-angular/stats.json
```

### **🧪 Testing Tailwind Integration**

```bash
# Restart development server
./dev.sh restart

# Test responsive design
# Resize browser window untuk test breakpoints

# Test dark mode
# Ubah system preference atau toggle dark mode button

# Verify build
ng build
# Check dist/ untuk optimized CSS
```

## 🚀 Development Setup

## �🚀 Development Setup

### Prerequisites
- Docker (v20.10+)
- Docker Compose (v2.0+)

### Quick Start

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd belajar_angular
   ```

2. **Start development environment**
   ```bash
   # Using helper script (recommended)
   ./dev.sh start
   
   # Or using docker-compose directly
   docker-compose up
   
   # Or using npm script
   npm run docker:dev
   ```

3. **Access application**
   - Development: http://localhost:4200
   - Container network: http://172.19.0.2:4200

### Development Features

- ✅ **Hot Reload**: Perubahan code otomatis ter-reload
- ✅ **Volume Mapping**: Source code di-map ke container untuk development yang seamless
- ✅ **Port Forwarding**: Port 4200 untuk Angular development server
- ✅ **Angular CLI 18**: Tersedia di dalam container dengan semua commands
- ✅ **TypeScript Support**: Full TypeScript support dengan strict mode
- ✅ **SCSS Support**: Sass/SCSS preprocessing untuk styling
- ✅ **Lazy Loading**: Components dimuat secara lazy untuk performa optimal

## 🏗️ Production Setup

### Build dan Deploy Production

```bash
# Build production image
docker-compose -f docker-compose.prod.yml up --build

# Atau gunakan npm script
npm run docker:build

# Atau gunakan helper script
./dev.sh build
```

**Production Features:**
- 🚀 **Multi-stage Build**: Optimized Docker build process
- 📦 **Nginx Server**: High-performance web server untuk serving static files
- 🗜️ **Compressed Assets**: Gzip compression untuk faster loading
- 🔒 **Security Headers**: Production-ready security configurations
- 📱 **SPA Fallback**: Proper handling untuk Angular routing

Production akan berjalan di port 80 dengan Nginx sebagai web server.

## 📜 Available Scripts

### NPM Scripts
```bash
npm start              # Start development server (local)
npm run build          # Build untuk production (local)
npm run test           # Run unit tests (local)
npm run docker:dev     # Start development dengan Docker
npm run docker:build   # Build production dengan Docker
```

### Helper Script (dev.sh)
```bash
./dev.sh start         # Start development environment
./dev.sh stop          # Stop development environment
./dev.sh restart       # Restart development environment
./dev.sh logs          # Show application logs
./dev.sh build         # Build production
./dev.sh clean         # Clean containers dan volumes
./dev.sh shell         # Open shell dalam container
./dev.sh install       # Install npm packages
./dev.sh test          # Run tests
```

### Docker Commands
```bash
# Development
docker-compose up                    # Start development
docker-compose down                  # Stop services
docker-compose logs angular-app      # View logs
docker-compose exec angular-app sh   # Access container shell

# Production
docker-compose -f docker-compose.prod.yml up --build
docker-compose -f docker-compose.prod.yml down
```

## 🏗️ Project Architecture

### Component Structure
- **HomeComponent**: Landing page dengan informasi project dan getting started guide
- **NotFoundComponent**: 404 error page dengan routing fallback
- **AppComponent**: Root component yang mengatur layout dan navigation

### Services Architecture
- **UserService**: Service untuk handle API calls dan user management (example implementation)
- **Injectable Services**: Menggunakan dependency injection pattern Angular

### Data Models
- **User Model**: Interface untuk user data dengan TypeScript typing
- **App Config Interface**: Configuration interfaces untuk type safety
- **API Response**: Generic response wrapper untuk API calls

### Routing Strategy
- **Lazy Loading**: Components dimuat on-demand untuk performa optimal
- **Route Guards**: Protection untuk routes (dapat ditambahkan)
- **Fallback Routing**: 404 handling untuk unknown routes

### State Management
- **Standalone Components**: Menggunakan Angular 18 standalone components
- **Signal-based**: Ready untuk Angular Signals (dapat ditambahkan)
- **Provider Pattern**: Modern dependency injection dengan providers

## ⚙️ Configuration Details

### Angular 18 Features
- **Application Builder**: New build system yang lebih cepat dari browser builder
- **Standalone Components**: Tidak memerlukan NgModule untuk components
- **TypeScript 5.4**: Latest TypeScript support dengan improved performance
- **Modern Bundling**: Optimized bundling dengan application builder
- **Tree Shaking**: Automatic removal of unused code

### Docker Configuration
- **Development**: Node.js 20 Alpine dengan hot reload dan volume mounting
- **Production**: Multi-stage build dengan Nginx untuk optimal performance
- **Network**: Custom Docker network untuk service communication
- **Volumes**: Persistent volumes untuk node_modules caching

### Build Performance
- **Development Build**: ~1.7 seconds dengan watch mode
- **Production Build**: Optimized dengan code splitting dan compression
- **Bundle Size**: ~91KB initial bundle (Angular 18 optimization)
- **Lazy Chunks**: Components di-split menjadi separate chunks

## 🔧 Development Tips

### Hot Reload Development
1. **File Changes**: Otomatis ter-reload di browser tanpa manual refresh
2. **Error Display**: Live error reporting di browser dan terminal
3. **Source Maps**: Available untuk debugging dengan browser dev tools
4. **TypeScript Checking**: Real-time type checking dan error reporting

### API Integration
1. **Environment Config**: Update `environment.ts` untuk API endpoints
2. **HTTP Client**: Angular HttpClient ready untuk API calls
3. **CORS Setup**: Configure CORS di backend atau proxy settings
4. **Error Handling**: Structured error handling dalam services

### Testing Strategy
```bash
# Unit Tests
./dev.sh test
npm run test

# E2E Tests (dapat ditambahkan)
ng e2e

# Component Testing
ng test --watch
```

### Production Deployment
1. **Container Registry**: Build dan push ke Docker Hub/AWS ECR/GCR
2. **Environment Variables**: Configure production environment settings
3. **SSL/TLS**: Setup HTTPS dengan reverse proxy (Nginx/Traefik)
4. **Monitoring**: Add application monitoring dan logging
5. **CI/CD**: Integrate dengan GitHub Actions/GitLab CI/Jenkins

## 📊 Performance Metrics

### Bundle Analysis (Angular 18)
```
Initial Chunks:
├── polyfills.js     88.09 kB
├── main.js           2.77 kB  
└── styles.css        619 bytes
Total Initial:        91.46 kB

Lazy Chunks:
├── home-component      5.81 kB
└── not-found-component 2.58 kB
```

### Build Performance
- **Development**: ~1.7s initial build
- **Production**: ~15-30s optimized build
- **Rebuild**: ~164ms incremental changes
- **Memory Usage**: ~200MB container runtime

## 🚨 Troubleshooting

### Common Issues

#### 1. Port already in use
```bash
# Stop existing containers
docker-compose down
# Or change port in docker-compose.yml
ports: ["4201:4200"]
```

#### 2. Permission issues (Linux/Mac)
```bash
# Fix permissions
sudo chown -R $USER:$USER .
# Or run with sudo
sudo docker-compose up
```

#### 3. Node modules cache issues
```bash
# Clean and rebuild
./dev.sh clean
docker-compose up --build
```

#### 4. TypeScript compilation errors
```bash
# Check tsconfig.json compatibility
# Ensure Angular 18 compatible TypeScript version
npm list typescript
```

#### 5. Hot reload not working
```bash
# Check volume mapping in docker-compose.yml
# Ensure polling is enabled in ng serve command
ng serve --poll=2000
```

### Debug Mode
```bash
# Access container shell
./dev.sh shell

# View detailed logs
./dev.sh logs

# Check Angular CLI version
ng version

# Verify package installation
npm list
```

## 🤝 Contributing

### Development Workflow
1. Fork project dan create feature branch
2. Make changes dengan proper commit messages
3. Test changes locally dengan `./dev.sh test`
4. Push to feature branch dan create Pull Request
5. Code review dan merge

### Code Style
- **ESLint**: Follow Angular style guide
- **Prettier**: Code formatting consistency
- **TypeScript**: Strict mode enabled
- **SCSS**: BEM methodology untuk CSS classes

### Commit Convention
```bash
feat: add new component
fix: resolve routing issue
docs: update README
style: format code
refactor: improve service structure
test: add unit tests
```

## 📄 License

MIT License - Lihat [LICENSE](LICENSE) file untuk details.

---

## 🎯 Next Steps

### Recommended Enhancements
1. **Authentication**: Add JWT-based authentication system
2. **State Management**: Implement NgRx atau Akita untuk complex state
3. **UI Library**: Integrate Angular Material atau PrimeNG
4. **Testing**: Add comprehensive unit dan e2e tests
5. **PWA**: Convert to Progressive Web App
6. **i18n**: Add internationalization support
7. **Monitoring**: Add error tracking dan analytics
8. **CI/CD**: Setup automated deployment pipeline

### Learning Resources
- [Angular 18 Documentation](https://angular.io)
- [Docker Documentation](https://docs.docker.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [SCSS Documentation](https://sass-lang.com/documentation)

**Happy Coding! 🚀**