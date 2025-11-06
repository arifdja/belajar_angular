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

## 🚀 Development Setup

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