import { Component, OnInit } from '@angular/core';
import { faCubes, faLocationDot, faTruckRampBox, faTruckFast } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  faCubes = faCubes;
  faLocationDot = faLocationDot;
  faTruckRampBox = faTruckRampBox;
  faTruckFast = faTruckFast;

  constructor() { }

  ngOnInit(): void {
  }

}
