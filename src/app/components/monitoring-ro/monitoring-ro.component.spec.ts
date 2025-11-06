import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringRoComponent } from './monitoring-ro.component';

describe('MonitoringRoComponent', () => {
  let component: MonitoringRoComponent;
  let fixture: ComponentFixture<MonitoringRoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoringRoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoringRoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
