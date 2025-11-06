import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render button with default properties', () => {
    expect(buttonElement.nativeElement).toBeTruthy();
    expect(component.variant).toBe('primary');
    expect(component.size).toBe('md');
    expect(component.disabled).toBeFalsy();
    expect(component.loading).toBeFalsy();
  });

  it('should emit clicked event when button is clicked', () => {
    spyOn(component.clicked, 'emit');
    
    buttonElement.nativeElement.click();
    
    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('should not emit clicked event when button is disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    spyOn(component.clicked, 'emit');
    
    buttonElement.nativeElement.click();
    
    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('should not emit clicked event when button is loading', () => {
    component.loading = true;
    fixture.detectChanges();
    spyOn(component.clicked, 'emit');
    
    buttonElement.nativeElement.click();
    
    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('should apply correct variant classes', () => {
    component.variant = 'danger';
    fixture.detectChanges();
    
    const classes = component.getButtonClasses();
    expect(classes).toContain('bg-red-600');
    expect(classes).toContain('text-white');
  });

  it('should apply correct size classes', () => {
    component.size = 'lg';
    fixture.detectChanges();
    
    const classes = component.getButtonClasses();
    expect(classes).toContain('px-4');
    expect(classes).toContain('py-2');
    expect(classes).toContain('text-base');
  });

  it('should show loading spinner when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();
    
    const spinner = fixture.debugElement.query(By.css('.animate-spin'));
    expect(spinner).toBeTruthy();
  });

  it('should show icon when icon is provided', () => {
    component.icon = 'save';
    fixture.detectChanges();
    
    const icon = fixture.debugElement.query(By.css('svg'));
    expect(icon).toBeTruthy();
  });

  it('should apply full width class when fullWidth is true', () => {
    component.fullWidth = true;
    fixture.detectChanges();
    
    const classes = component.getButtonClasses();
    expect(classes).toContain('w-full');
  });

  it('should set correct button type', () => {
    component.type = 'submit';
    fixture.detectChanges();
    
    expect(buttonElement.nativeElement.type).toBe('submit');
  });

  it('should set aria-label when provided', () => {
    component.ariaLabel = 'Test button';
    fixture.detectChanges();
    
    expect(buttonElement.nativeElement.getAttribute('aria-label')).toBe('Test button');
  });
});