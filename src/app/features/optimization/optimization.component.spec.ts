import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Optimization } from './optimization';

describe('Optimization', () => {
  let component: Optimization;
  let fixture: ComponentFixture<Optimization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Optimization]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Optimization);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
