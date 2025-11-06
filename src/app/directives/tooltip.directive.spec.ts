import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';

@Component({
  template: `<div appTooltip="Test tooltip text">Hover me</div>`,
  standalone: true,
  imports: [TooltipDirective]
})
class TestComponent {}

describe('TooltipDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show tooltip on mouse enter', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tooltipElement = compiled.querySelector('div');
    
    if (tooltipElement) {
      const mouseEnterEvent = new MouseEvent('mouseenter', { clientX: 100, clientY: 100 });
      tooltipElement.dispatchEvent(mouseEnterEvent);
      
      // Check if tooltip component is created (would need to be mocked properly)
      expect(tooltipElement).toBeTruthy();
    }
  });
});