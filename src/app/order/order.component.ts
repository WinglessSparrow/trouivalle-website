import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {faEnvelope, faBox, faBoxesStacked} from "@fortawesome/free-solid-svg-icons";


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
        firstName: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
            Validators.pattern("[a-zA-ZäöüÄÖÜß]*")
        ]),
        lastName: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
            Validators.pattern("[a-zA-ZäöüÄÖÜß]*")
        ]),
        email: new FormControl("", [
            Validators.required,
            Validators.email,
        ]),
        city: new FormControl("", [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(20),
                Validators.pattern("[a-zA-ZäöüÄÖÜß]*")
            ]),
        postalCode: new FormControl("", [
            Validators.required,
            Validators.maxLength(5),
            Validators.minLength(5),
            Validators.pattern("[0-9]{5}")
        ]),
        street: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
            Validators.pattern("[a-zA-ZäöüÄÖÜß]*")
        ]),
        houseNumber: new FormControl("", [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(4),
            Validators.pattern("[0-9]*")
        ]),
        country: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
            Validators.pattern("[a-zA-ZäöüÄÖÜß]*")
        ])
    });

    receiver = new FormGroup({
        firstName: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
            Validators.pattern("[a-zA-ZäöüÄÖÜß]*")
        ]),
        lastName: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
            Validators.pattern("[a-zA-ZäöüÄÖÜß]*")
        ]),
        email: new FormControl("", [
            Validators.required,
            Validators.email
        ]),
        city: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
            Validators.pattern("[a-zA-ZäöüÄÖÜß]*")
        ]),
        postalCode: new FormControl("", [
            Validators.required,
            Validators.maxLength(5),
            Validators.minLength(5),
            Validators.pattern("[0-9]{5}")
        ]),
        street: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
            Validators.pattern("[a-zA-ZäöüÄÖÜß]*")
        ]),
        houseNumber: new FormControl("", [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(4),
            Validators.pattern("[0-9]*")
        ]),
        country: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
            Validators.pattern("[a-zA-ZäöüÄÖÜß]*")
        ])
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
