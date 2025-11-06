# Button Component

Komponen button yang reusable dan fleksibel untuk aplikasi Angular.

## Cara Penggunaan

### Import Komponen

```typescript
import { ButtonComponent } from '../components/button';

@Component({
  // ...
  imports: [CommonModule, ButtonComponent]
})
```

### Basic Usage

```html
<app-button variant="primary" (clicked)="handleClick()">
  Click Me
</app-button>
```

### With Icon

```html
<app-button variant="success" 
            icon="save" 
            iconPosition="left"
            (clicked)="onSave()">
  Save
</app-button>
```

### Loading State

```html
<app-button variant="primary" 
            [loading]="isLoading"
            (clicked)="onSubmit()">
  Submit
</app-button>
```

### Different Sizes

```html
<app-button size="xs">Extra Small</app-button>
<app-button size="sm">Small</app-button>
<app-button size="md">Medium</app-button>
<app-button size="lg">Large</app-button>
<app-button size="xl">Extra Large</app-button>
```

### Different Variants

```html
<app-button variant="primary">Primary</app-button>
<app-button variant="secondary">Secondary</app-button>
<app-button variant="success">Success</app-button>
<app-button variant="danger">Danger</app-button>
<app-button variant="warning">Warning</app-button>
<app-button variant="info">Info</app-button>
<app-button variant="outline">Outline</app-button>
<app-button variant="ghost">Ghost</app-button>
```

### Full Width

```html
<app-button variant="primary" [fullWidth]="true">
  Full Width Button
</app-button>
```

### Disabled State

```html
<app-button variant="primary" [disabled]="true">
  Disabled Button
</app-button>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `ButtonVariant` | `'primary'` | Style variant of the button |
| `size` | `ButtonSize` | `'md'` | Size of the button |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean` | `false` | Whether the button is in loading state |
| `fullWidth` | `boolean` | `false` | Whether the button takes full width |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `icon` | `string` | `undefined` | Icon to display |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Position of the icon |
| `ariaLabel` | `string` | `undefined` | Accessibility label |
| `customClass` | `string` | `''` | Additional CSS classes |

## Events

| Event | Type | Description |
|-------|------|-------------|
| `clicked` | `EventEmitter<Event>` | Emitted when button is clicked |

## Button Variants

- **primary**: Blue background, white text
- **secondary**: Gray background, white text  
- **success**: Green background, white text
- **danger**: Red background, white text
- **warning**: Yellow background, white text
- **info**: Cyan background, white text
- **outline**: White background, gray border and text
- **ghost**: Transparent background, gray text

## Button Sizes

- **xs**: Extra small (px-2.5 py-1.5 text-xs)
- **sm**: Small (px-3 py-2 text-sm)
- **md**: Medium (px-4 py-2 text-sm) - Default
- **lg**: Large (px-4 py-2 text-base)
- **xl**: Extra large (px-6 py-3 text-base)

## Available Icons

- `save` - Save/floppy disk icon
- `edit` - Edit/pencil icon
- `delete` - Delete/trash icon
- `add` - Plus/add icon
- `search` - Search/magnifying glass icon
- `download` - Download icon
- `upload` - Upload/cloud icon
- `refresh` - Refresh/reload icon
- `close` - Close/X icon
- `check` - Checkmark icon
- `arrow-left` - Left arrow icon
- `arrow-right` - Right arrow icon

## Features

- ✅ Multiple variants and sizes
- ✅ Icon support with positioning
- ✅ Loading state with spinner
- ✅ Disabled state
- ✅ Full width option
- ✅ Accessibility support
- ✅ Custom CSS classes
- ✅ Event emission
- ✅ TypeScript support
- ✅ Comprehensive testing
- ✅ Responsive design

## Example Implementation

```typescript
export class MyComponent {
  isLoading = false;
  
  async onSave(): Promise<void> {
    this.isLoading = true;
    try {
      // Perform save operation
      await this.saveData();
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
```

```html
<app-button variant="primary" 
            icon="save"
            [loading]="isLoading"
            [disabled]="!isFormValid"
            (clicked)="onSave()">
  Save Changes
</app-button>
```