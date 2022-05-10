import { Component, OnInit } from '@angular/core';
import {faEnvelope, faBox, faBoxesStacked} from "@fortawesome/free-solid-svg-icons";
import {Package} from "../models/Package";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

    faEnvelope = faEnvelope;
    faBox = faBox;
    faBoxesStacked = faBoxesStacked;

    public package: Package;

    public packageForm = new FormGroup({
        height: new FormControl("", [
            Validators.required,
            Validators.min(0.1),
            Validators.max(60)
        ]),
        width: new FormControl("", [
            Validators.required,
            Validators.min(7),
            Validators.max(60)
        ]),
        depth: new FormControl("", [
            Validators.required,
            Validators.min(10),
            Validators.max(120)
        ]),
        weight: new FormControl("", [
            Validators.required,
            Validators.min(0.1),
            Validators.max(31500)
        ]),
        price: new FormControl("")
        // todo validation mit unseren Maßen festlegen
    });

  constructor() {

      this.package = new Package();
  }

  ngOnInit(): void {
  }


  public calculatePrice(): void {

      let price: number = 0;

      this.package.height = this.packageForm.get("height")?.value;
      this.package.width = this.packageForm.get("width")?.value;
      this.package.depth = this.packageForm.get("depth")?.value;
      this.package.weight = this.packageForm.get("weight")?.value;

      if (this.package.weight > 0 && this.package.weight <= 20) {
        price = 0.85;
      }
      else if (this.package.weight > 20 && this.package.weight <= 50) {
        price = 1.00;
      }
      else if (this.package.weight > 50 && this.package.weight <= 500) {
        price = 1.60;
      }
      else if (this.package.weight > 500 && this.package.weight <= 1000) {
        price = 2.75;
      }
      else if (this.package.weight > 1000 && this.package.weight <= 2000) {
          // päckchen oder paket bis 2kg#
          price = 3.79;
      }
      else if (this.package.weight > 2000 && this.package.weight <= 5000) {
        price = 5.99;
      }
      else if (this.package.weight > 5000 && this.package.weight <= 10000) {
        price = 8.49;
      }
      else if (this.package.weight > 10000 && this.package.weight <= 31500) {
        price = 16.49;
      }

      this.packageForm.get("price")?.setValue(price);
  }
}
