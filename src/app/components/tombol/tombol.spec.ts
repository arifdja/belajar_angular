import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tombol } from './tombol';

describe('Tombol', () => {
  let component: Tombol;
  let fixture: ComponentFixture<Tombol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tombol]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tombol);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
