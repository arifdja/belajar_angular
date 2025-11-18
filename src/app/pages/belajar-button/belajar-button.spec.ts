import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BelajarButton } from './belajar-button';

describe('BelajarButton', () => {
  let component: BelajarButton;
  let fixture: ComponentFixture<BelajarButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BelajarButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BelajarButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
