import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipComponent } from './tooltip.component';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show tooltip when show method is called', () => {
    const mockEvent = new MouseEvent('mouseenter', { clientX: 100, clientY: 100 });
    component.show(mockEvent, 'Test content');
    
    setTimeout(() => {
      expect(component.isVisible).toBeTruthy();
      expect(component.content).toBe('Test content');
    }, 0);
  });

  it('should hide tooltip when hide method is called', () => {
    component.isVisible = true;
    component.hide();
    
    setTimeout(() => {
      expect(component.isVisible).toBeFalsy();
    }, 100);
  });

  it('should update position correctly', () => {
    const mockEvent = new MouseEvent('mousemove', { clientX: 150, clientY: 200 });
    component.isVisible = true;
    component.updatePosition(mockEvent);
    
    expect(component.actualPosition.x).toBe(160); // 150 + 10 offset
    expect(component.actualPosition.y).toBe(190); // 200 - 10 offset
  });
});