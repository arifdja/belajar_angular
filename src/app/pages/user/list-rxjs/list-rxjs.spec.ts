import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRxjs } from './list-rxjs';

describe('ListRxjs', () => {
  let component: ListRxjs;
  let fixture: ComponentFixture<ListRxjs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRxjs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRxjs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
