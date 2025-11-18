import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Latihan } from './latihan';

describe('Latihan', () => {
  let component: Latihan;
  let fixture: ComponentFixture<Latihan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Latihan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Latihan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
