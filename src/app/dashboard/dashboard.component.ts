import { Component, OnInit } from '@angular/core';
import { FooterComponent} from "../footer/footer.component";
import { faBoxesStacked, faLocationDot, faTruckRampBox, faTruckFast, faBox } from "@fortawesome/free-solid-svg-icons";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

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

  public trackingId = 0;

  trackingForm = new FormControl("", [
      Validators.required,
      Validators.pattern("[0-9]*")
  ])

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

    public openShipmentTracking(): void {
      this.trackingId = this.trackingForm.value;
        this.router.navigate(['/shipment-tracking'], {
            queryParams: {
                trackingId: this.trackingId
            }
        });

    }

}
