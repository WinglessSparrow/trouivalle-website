import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validator} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {faEnvelope, faBox, faBoxesStacked} from "@fortawesome/free-solid-svg-icons";
import {F} from "@angular/cdk/keycodes";


@Component({
    selector: 'order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

    faEnvelope = faEnvelope;
    faBox = faBox;
    faBoxesStacked = faBoxesStacked;

    sender = new FormGroup({
        firstName: new FormControl(),
        lastName: new FormControl(),
        email: new FormControl(),
        city: new FormControl(),
        postalCode: new FormControl(),
        street: new FormControl(),
        houseNumber: new FormControl(),
        country: new FormControl()
    });

    receiver = new FormGroup({
        firstName: new FormControl(),
        lastName: new FormControl(),
        email: new FormControl(),
        city: new FormControl(),
        postalCode: new FormControl(),
        street: new FormControl(),
        houseNumber: new FormControl(),
        country: new FormControl()
    });

    dimensions = new FormGroup({
        height: new FormControl(),
        width: new FormControl(),
        depth: new FormControl(),
        weight: new FormControl()
        // todo validation mit unseren Maßen festlegen
    });

    payment = new FormControl({});
    pickup = new FormControl({});

    constructor() {
    }

    ngOnInit(): void {
    }

}
