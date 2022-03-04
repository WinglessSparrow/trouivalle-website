import { Component, OnInit } from '@angular/core';
import { FooterComponent} from "../footer/footer.component";
import { faBoxesStacked, faLocationDot, faTruckRampBox, faTruckFast, faBox } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  faBoxesStacked = faBoxesStacked;
  faLocationDot = faLocationDot;
  faTruckRampBox = faTruckRampBox;
  faTruckFast = faTruckFast;
  faBox = faBox;

  constructor() { }

  ngOnInit(): void {
  }

}
