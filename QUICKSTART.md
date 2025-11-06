# 🚀 Angular 18 + Docker - Quick Start Guide

Panduan cepat untuk memulai development dengan Angular 18 dan Docker setup.

## ⚡ Quick Commands

### Start Development (Choose One)
```bash
# 🔧 Using helper script (Recommended)
./dev.sh start

# 🐳 Using docker-compose
docker-compose up

# 📦 Using npm
npm run docker:dev
```

### Access Application
- **Development Server**: http://localhost:4200
- **Container Network**: http://172.19.0.2:4200

## 📁 Key Files & Folders

### **🎯 Must-Know Files**
```
📂 src/
├── 📄 main.ts                    # ⭐ App entry point
├── 📄 index.html                 # HTML template
├── 📄 styles.scss                # Global styles
│
├── 📂 app/
│   ├── 📄 app.component.ts       # ⭐ Root component
│   ├── 📄 app.config.ts          # ⭐ App configuration
│   ├── 📄 app.routes.ts          # ⭐ Routing setup
│   │
│   ├── 📂 components/            # ⭐ Your components here
│   │   ├── 📂 home/              # Home page
│   │   └── 📂 not-found/         # 404 page
│   │
│   ├── 📂 services/              # ⭐ Business logic
│   └── 📂 models/                # ⭐ Data types
│
├── 📂 environments/              # ⭐ Config files
│   ├── 📄 environment.ts         # Development config
│   └── 📄 environment.prod.ts    # Production config
```

### **🐳 Docker Files**
```
📄 docker-compose.yml             # ⭐ Development environment
📄 docker-compose.prod.yml        # Production environment
📄 Dockerfile.dev                 # Development container
📄 Dockerfile.prod                # Production container
```

### **⚙️ Configuration Files**
```
📄 package.json                   # ⭐ Dependencies & scripts
📄 angular.json                   # ⭐ Angular workspace config
📄 tsconfig.json                  # ⭐ TypeScript config
```

## 🛠️ Development Commands

### **Helper Script Commands**
```bash
./dev.sh start         # 🚀 Start development
./dev.sh stop          # ⏹️ Stop services
./dev.sh restart       # 🔄 Restart services
./dev.sh logs          # 📋 View logs
./dev.sh shell         # 🐚 Enter container
./dev.sh clean         # 🧹 Clean everything
./dev.sh build         # 🏗️ Build production
./dev.sh test          # 🧪 Run tests
./dev.sh install       # 📦 Install packages
```

### **Docker Commands**
```bash
# Development
docker-compose up                 # Start dev environment
docker-compose down               # Stop services
docker-compose logs angular-app   # View logs
docker-compose exec angular-app sh # Enter container

# Production
docker-compose -f docker-compose.prod.yml up --build
```

### **NPM Commands**
```bash
npm run docker:dev      # Start with Docker
npm run docker:build    # Build production
npm start               # Local development (without Docker)
npm test                # Run tests locally
npm run build           # Build locally
```

## 📝 Quick Development Guide

### **1. Start Development**
```bash
./dev.sh start
# Wait for "Local: http://localhost:4200/"
# Open browser to http://localhost:4200
```

### **2. Create New Component**
```bash
# Enter container shell
./dev.sh shell

# Generate component
ng generate component components/my-component

# Or generate with routing
ng generate component components/my-page --routing
```

### **3. Add New Route**
Edit `src/app/app.routes.ts`:
```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'my-page',  // ⭐ Add your route
    loadComponent: () => import('./components/my-component/my-component.component').then(m => m.MyComponent) 
  },
  { path: '**', loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
```

### **4. Create Service**
```bash
# In container shell
ng generate service services/my-service
```

### **5. Add Environment Variables**
Edit `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',  // ⭐ Your API URL
  appName: 'My Angular App',
  apiKey: 'your-dev-api-key'            // ⭐ Add configs here
};
```

## 🎨 Styling Guide

### **Global Styles**
Edit `src/styles.scss`:
```scss
// ⭐ Add global styles here
.my-global-class {
  color: #1976d2;
}
```

### **Component Styles**
In component `.scss` files:
```scss
// ⭐ Component-specific styles
.my-component {
  &__title {
    font-size: 2rem;
    color: #333;
  }
  
  &__content {
    padding: 1rem;
  }
}
```

## 📦 Adding Dependencies

### **1. Enter Container**
```bash
./dev.sh shell
```

### **2. Install Package**
```bash
# Angular Material
npm install @angular/material @angular/cdk @angular/animations

# HTTP Client
npm install @angular/common

# RxJS operators
npm install rxjs

# Icons
npm install @angular/material @angular/material-icons
```

### **3. Restart Container**
```bash
exit  # Exit container shell
./dev.sh restart
```

## 🏗️ Project Structure Explanation

### **📂 /src/app/ - Application Core**
```
components/     # ⭐ UI Components (pages, widgets, forms)
services/       # ⭐ Business logic & API calls  
models/         # ⭐ TypeScript interfaces & types
guards/         # 🔒 Route protection (add as needed)
pipes/          # 🔧 Data transformation (add as needed)
interceptors/   # 🌐 HTTP interceptors (add as needed)
```

### **📂 /src/environments/ - Configuration**
```
environment.ts          # 🔧 Development settings
environment.prod.ts     # 🏭 Production settings
environment.staging.ts  # 🎭 Staging settings (create if needed)
```

### **📂 /src/assets/ - Static Files**
```
images/         # 🖼️ Images, icons, logos
fonts/          # 🔤 Custom fonts
data/           # 📊 JSON data files
styles/         # 🎨 Additional style files
```

## ⚡ Performance Tips

### **1. Lazy Loading**
Components automatically lazy-loaded via routing:
```typescript
// ✅ Good - Lazy loaded
{ path: 'feature', loadComponent: () => import('./feature.component') }

// ❌ Avoid - Eager loaded
import { FeatureComponent } from './feature.component';
```

### **2. OnPush Change Detection**
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush  // ⭐ Better performance
})
```

### **3. Track By Functions**
```html
<!-- ✅ Good -->
<div *ngFor="let item of items; trackBy: trackByFn">

<!-- ❌ Avoid -->
<div *ngFor="let item of items">
```

## 🐛 Common Issues & Solutions

### **1. Container Won't Start**
```bash
# Check if port is in use
lsof -i :4200

# Kill process using port
kill -9 <PID>

# Or change port in docker-compose.yml
ports: ["4201:4200"]
```

### **2. Hot Reload Not Working**
```bash
# Restart with clean build
./dev.sh clean
./dev.sh start
```

### **3. Permission Issues (Linux/Mac)**
```bash
# Fix file permissions
sudo chown -R $USER:$USER .
```

### **4. Node Modules Issues**
```bash
# Clean node modules cache
./dev.sh shell
rm -rf node_modules package-lock.json
npm install
exit
./dev.sh restart
```

## 📊 What You Get Out of the Box

### **✅ Angular 18 Features**
- 🚀 **Application Builder** - Faster builds than browser builder
- 📦 **Standalone Components** - No NgModule needed
- 🔄 **Hot Reload** - Instant updates during development
- 📱 **Responsive Design** - Mobile-first approach
- 🎨 **SCSS Support** - Advanced styling capabilities
- 🔧 **TypeScript 5.4** - Latest TypeScript features

### **✅ Docker Setup**
- 🐳 **Development Container** - Consistent environment
- 🏭 **Production Build** - Optimized for deployment
- 🔥 **Hot Reload** - File watching and live updates
- 📁 **Volume Mapping** - Source code synchronization
- 🌐 **Network Configuration** - Easy service communication

### **✅ Developer Experience**
- ⚡ **Fast Builds** - ~1.7s initial, ~164ms incremental
- 🧪 **Testing Ready** - Karma + Jasmine setup
- 📝 **TypeScript Strict Mode** - Better code quality
- 🛡️ **Error Handling** - Comprehensive error reporting
- 📊 **Bundle Analysis** - Optimized bundle sizes

## 🎯 Ready for Development!

Your Angular 18 + Docker development environment is now ready! 

**Start coding**: Edit files in `src/` and see changes instantly in the browser! 🎉

**Next Steps**:
1. Explore the `src/app/components/home/` to see example component
2. Check `src/app/services/user.service.ts` for API service example  
3. Review `src/app/models/` for TypeScript interfaces
4. Read the full [README.md](README.md) for comprehensive documentation

**Happy Coding! 🚀**