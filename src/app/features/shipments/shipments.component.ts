import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentService, Shipment } from '../../services/shipment.service';

@Component({
  selector: 'app-shipments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent implements OnInit {

  shipments: Shipment[] = [];

  constructor(private shipmentSvc: ShipmentService) {}

  ngOnInit() {
    this.shipmentSvc.getPastShipments().subscribe(data => {
      this.shipments = data || [];
    });
  }
}
