# Tooltip Component

Komponen tooltip yang reusable untuk aplikasi Angular.

## Cara Penggunaan

### 1. Menggunakan Komponen Tooltip Langsung

```typescript
import { TooltipComponent } from '../components/tooltip';

@Component({
  // ...
  imports: [CommonModule, TooltipComponent]
})
export class YourComponent {
  @ViewChild(TooltipComponent) tooltip!: TooltipComponent;

  onMouseEnter(event: MouseEvent, text: string): void {
    this.tooltip.show(event, text);
  }

  onMouseLeave(): void {
    this.tooltip.hide();
  }

  onMouseMove(event: MouseEvent): void {
    this.tooltip.updatePosition(event);
  }
}
```

```html
<div (mouseenter)="onMouseEnter($event, 'Tooltip text')"
     (mouseleave)="onMouseLeave()"
     (mousemove)="onMouseMove($event)">
  Hover me
</div>

<app-tooltip #tooltip></app-tooltip>
```

### 2. Menggunakan Directive (Optional)

```typescript
import { TooltipDirective } from '../directives/tooltip.directive';

@Component({
  // ...
  imports: [CommonModule, TooltipDirective]
})
```

```html
<div appTooltip="Tooltip text" 
     tooltipPosition="auto" 
     tooltipTheme="dark">
  Hover me
</div>
```

## Properties

- `content`: string - Teks yang akan ditampilkan di tooltip
- `position`: 'top' | 'bottom' | 'left' | 'right' | 'auto' - Posisi tooltip
- `theme`: 'dark' | 'light' - Tema warna tooltip
- `maxWidth`: string - Lebar maksimum tooltip
- `delay`: number - Delay sebelum tooltip muncul (dalam milliseconds)

## Methods

- `show(event: MouseEvent, content?: string)`: Menampilkan tooltip
- `hide()`: Menyembunyikan tooltip
- `updatePosition(event: MouseEvent)`: Update posisi tooltip

## Features

- ✅ Auto positioning untuk mencegah tooltip keluar dari viewport
- ✅ Multiple themes (dark/light)
- ✅ Configurable delay
- ✅ Smooth animations
- ✅ Responsive design
- ✅ TypeScript support
- ✅ Standalone component (Angular 17+)