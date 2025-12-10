import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveStops } from './move-stops.component';

describe('MoveStops', () => {
  let component: MoveStops;
  let fixture: ComponentFixture<MoveStops>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoveStops]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveStops);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
