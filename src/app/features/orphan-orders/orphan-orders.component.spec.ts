import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrphanOrders } from './orphan-orders.component';

describe('OrphanOrders', () => {
  let component: OrphanOrders;
  let fixture: ComponentFixture<OrphanOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrphanOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrphanOrders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
