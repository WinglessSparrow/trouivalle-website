import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {faEnvelope, faBox, faBoxesStacked} from "@fortawesome/free-solid-svg-icons";
import {Address} from "../models/Address";
import {Customer} from "../models/Customer";
import {Package} from "../models/Package";


@Component({
    selector: 'order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

    private senderAddress: Address;
    private receiverAddress: Address;
    private customer: Customer;
    private package: Package;

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

    public packageForm = new FormGroup({
        height: new FormControl(),
        width: new FormControl(),
        depth: new FormControl(),
        weight: new FormControl()
        // todo validation mit unseren Maßen festlegen
    });

    payment = new FormControl({});
    pickup = new FormControl("", Validators.required);

    constructor() {
        this.senderAddress = new Address();
        this.receiverAddress = new Address();
        this.customer = new Customer();
        this.package = new Package();
    }

    ngOnInit(): void {
    }

    public setAddresses(): void {

        this.receiverAddress.zipCode = this.receiver.get("postalCode")?.value;
        this.receiverAddress.city = this.receiver.get("city")?.value;
        this.receiverAddress.streetName = this.receiver.get("street")?.value;
        this.receiverAddress.streetNumber = this.receiver.get("houseNumber")?.value;
        this.receiverAddress.country = this.receiver.get("country")?.value;

        this.senderAddress.zipCode = this.sender.get("postalCode")?.value;
        this.senderAddress.city = this.sender.get("city")?.value;
        this.senderAddress.streetName = this.sender.get("street")?.value;
        this.senderAddress.streetNumber = this.sender.get("houseNumber")?.value;
        this.senderAddress.country = this.sender.get("country")?.value;

        // todo Adressen in der DB speichern und neu anfordern (um Adress-ID in setCustomer zu haben)
        console.log(this.senderAddress);
        console.log(this.receiverAddress);
        this.setCustomer();
    }

    public setCustomer(): void {

        this.customer.firstName = this.sender.get("firstName")?.value;
        this.customer.lastName = this.sender.get("lastName")?.value;
        this.customer.email = this.sender.get("email")?.value;
        this.customer.idaddress = this.senderAddress.idAddress;

        // todo in DB speichern
        console.log(this.customer);
        this.setPackage();
    }

    public setPackage(): void {

        this.package.weight = this.packageForm.get("weight")?.value;
        this.package.height = this.packageForm.get("height")?.value;
        this.package.width = this.packageForm.get("width")?.value;
        this.package.depth = this.packageForm.get("depth")?.value;

        this.package.sourceAddressId = this.senderAddress.idAddress;
        this.package.destinationAddressId = this.receiverAddress.idAddress;

        console.log(this.package);
        // todo abholung / bringen
    }

}
