import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Unified } from './unified';

describe('Unified', () => {
  let component: Unified;
  let fixture: ComponentFixture<Unified>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Unified]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Unified);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
