import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {faEnvelope, faBox, faBoxesStacked, faTruckRampBox} from "@fortawesome/free-solid-svg-icons";
import {Address} from "../models/Address";
import {Customer} from "../models/Customer";
import {Package} from "../models/Package";
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import {Order} from "../models/Order";
import {Pickup} from "../models/Pickup";
import {AddressValidationService} from "../../services/address-validation.service";
import {MatDialog} from "@angular/material/dialog";
import {TrackingDialogComponent} from "../modal/tracking-dialog/tracking-dialog.component";
import {MatStepper} from "@angular/material/stepper";
import {OrderService} from "../../services/order.service";
import {OrderDto} from "../models/OrderDto";
import {SuccessDialogComponent} from "../modal/success-dialog/success-dialog.component";
import {ConfirmationOrderService} from "../../services/confirmation-order.service";


@Component({
    selector: 'order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

    public order: Order;
    public senderAddress: Address;
    public receiverAddress: Address;
    public customer: Customer;
    public receiver: Customer;
    public package: Package;
    public pickup: Pickup;
    public showPickupConfig: boolean = false;
    public freiburgPostalCodes: string[] = ['79098', '79100', '79102', '79104', '79106', '79108', '19110', '79112', '79114'];
    public hidePaypal = false;

    public paypalConfig?: IPayPalConfig;

    public shippingCosts = 0;
    public packageCosts = 0;
    public sumCosts = 0;

    faEnvelope = faEnvelope;
    faBox = faBox;
    faBoxesStacked = faBoxesStacked;
    faTruckRampBox = faTruckRampBox;

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
            Validators.pattern("([a-zA-ZäöüÄÖÜß]+[-]?[ ]?[a-zA-ZäöüÄÖÜß]+)*")
        ]),
        postalCode: new FormControl("", [
            Validators.required,
            Validators.maxLength(5),
            Validators.minLength(5),
            Validators.pattern("[1-9][0-9]{4}")
        ]),
        street: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30),
            Validators.pattern("([a-zA-ZäöüÄÖÜß]+[-]?[ ]?[a-zA-ZäöüÄÖÜß]+)*")
        ]),
        houseNumber: new FormControl("", [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(4),
            Validators.pattern("[1-9][0-9]*")
        ]),
        country: new FormControl("", [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
            Validators.pattern("[a-zA-ZäöüÄÖÜß]*")
        ])
    });

    receiverGroup = new FormGroup({
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
            Validators.pattern("([a-zA-ZäöüÄÖÜß]+[-]?[ ]?[a-zA-ZäöüÄÖÜß]+)*")
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
            Validators.maxLength(30),
            Validators.pattern("([a-zA-ZäöüÄÖÜß]+[-]?[ ]?[a-zA-ZäöüÄÖÜß]+)*")
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
        ])
        // todo validation mit unseren Maßen festlegen
    });

    payment = new FormControl("", Validators.required);
    pickupForm = new FormControl("", Validators.required);

    pickupDate = new FormControl("", Validators.required);
    pickupTime = new FormControl("", Validators.required);

    constructor(private addressValidationService: AddressValidationService, private dialog: MatDialog, private orderService: OrderService, private confirmationService: ConfirmationOrderService) {
        this.senderAddress = new Address();
        this.receiverAddress = new Address();
        this.customer = new Customer();
        this.receiver = new Customer();
        this.package = new Package();
        this.order = new Order();
        this.pickup = new Pickup();
    }

    // Postleitzahlen Freiburg:
    // 79098, 79100, 79102, 79104, 79106, 79108, 19110, 79111, 79112, 79114
    // https://www.geoapify.com
    // https://api.geoapify.com/v1/geocode/search?text=1000%2CBadstra%C3%9Fe%2C77652%2COffenburg%2CDeutschland&lang=de&filter=countrycode:de&apiKey=8923fefc90c24aa1bbe6bb22b302d39b

    ngOnInit(): void {

        //Testweise
        this.sender.get("firstName")?.setValue("Tom");
        this.sender.get("lastName")?.setValue("Maier");
        this.sender.get("email")?.setValue("sadfaf@gmail.com");
        this.sender.get("postalCode")?.setValue("79108");
        this.sender.get("city")?.setValue("Freiburg");
        this.sender.get("country")?.setValue("Deutschland");
        this.sender.get("houseNumber")?.setValue("5");
        this.sender.get("street")?.setValue("Tullastraße");

        this.receiverGroup.get("firstName")?.setValue("Tim");
        this.receiverGroup.get("lastName")?.setValue("Mayer");
        this.receiverGroup.get("email")?.setValue("ssaf@gmail.com");
        this.receiverGroup.get("postalCode")?.setValue("77652");
        this.receiverGroup.get("city")?.setValue("Offenburg");
        this.receiverGroup.get("country")?.setValue("Deutschland");
        this.receiverGroup.get("houseNumber")?.setValue("24");
        this.receiverGroup.get("street")?.setValue("Badstraße");

        this.packageForm.get("height")?.setValue("20");
        this.packageForm.get("width")?.setValue("20");
        this.packageForm.get("depth")?.setValue("20");
        this.packageForm.get("weight")?.setValue("20000");


    }

    public createPDF(): void {

        // Zum Testen
        // todo später entfernen
        this.package.price = this.sumCosts;
        this.order.customer = this.receiver;
        this.order.package = this.package;
        this.order.paymentMethod = this.payment.value;

        let orderToSend: OrderDto = new OrderDto();
        orderToSend.customer = this.customer;
        orderToSend.pack = this.package;
        orderToSend.destAddress = this.receiverAddress;
        orderToSend.srcAddress = this.senderAddress;
        orderToSend.paymentMethod = this.payment.value;
        orderToSend.isPickup = (this.pickupForm.value === 'pickup');
        orderToSend.pickupDate = this.pickupDate.value;

        this.confirmationService.createConfirmationPDF(this.customer, this.receiver, this.package, orderToSend, "BLABLAB");
    }

    public initPaypalConfig(): void {
        let disabledFundings: string = '';
        switch (this.payment.value) {
            case 'DIRECT_DEBIT': {
                disabledFundings = 'card,sepa,credit';
                break;
            }
            case 'PAYPAL': {
                disabledFundings = 'card,sepa,giropay,sofort';
            }
        }

        this.paypalConfig = {
            currency: 'EUR',
            clientId: 'AUh5JWBnqOKQZhgufnUNa5HvqYeA705b9s7eQOgyAYgJhSvq7nOPu7BWrThvNlJO_6PPb8LnJ0ipRAFC',

            createOrderOnClient: (data) => <ICreateOrderRequest>{
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'EUR',
                            value: this.sumCosts.toString(),
                            breakdown: {
                                item_total: {
                                    currency_code: 'EUR',
                                    value: this.sumCosts.toString()
                                }
                            }
                        },
                        items: [
                            {
                                name: 'Sendung',
                                quantity: '1',
                                unit_amount: {
                                    currency_code: 'EUR',
                                    value: this.sumCosts.toString()
                                },
                            }
                        ]
                    }
                ]
            },
            advanced: {
                commit: 'true',
                extraQueryParams: [
                    {
                        name: 'disable-funding', value: disabledFundings
                    }
                ]
            },
            style: {
                label: 'paypal',
                layout: 'vertical'
            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization --> Server über getätigte Transaktion informieren');
                this.createNewOrder();
                this.hidePaypal = true;
            }
        }
    }

    public setAddresses(): void {

        this.receiverAddress.zipCode = this.receiverGroup.get("postalCode")?.value;
        this.receiverAddress.city = this.receiverGroup.get("city")?.value;
        this.receiverAddress.streetName = this.receiverGroup.get("street")?.value;
        this.receiverAddress.streetNumber = this.receiverGroup.get("houseNumber")?.value;
        this.receiverAddress.country = this.receiverGroup.get("country")?.value;

        this.senderAddress.zipCode = this.sender.get("postalCode")?.value;
        this.senderAddress.city = this.sender.get("city")?.value;
        this.senderAddress.streetName = this.sender.get("street")?.value;
        this.senderAddress.streetNumber = this.sender.get("houseNumber")?.value;
        this.senderAddress.country = this.sender.get("country")?.value;

        this.setCustomerAndReceiver();
    }

    public setCustomerAndReceiver(): void {

        this.customer.firstName = this.sender.get("firstName")?.value;
        this.customer.lastName = this.sender.get("lastName")?.value;
        this.customer.email = this.sender.get("email")?.value;
        this.customer.idaddress = this.senderAddress.idAddress

        this.receiver.firstName = this.receiverGroup.get("firstName")?.value;
        this.receiver.lastName = this.receiverGroup.get("lastName")?.value;
        this.receiver.email = this.receiverGroup.get("email")?.value;
        this.receiver.idaddress = this.receiverAddress.idAddress;
    }

    public setPackage(): void {

        this.package.weight = this.packageForm.get("weight")?.value;
        this.package.height = this.packageForm.get("height")?.value;
        this.package.width = this.packageForm.get("width")?.value;
        this.package.depth = this.packageForm.get("depth")?.value;

        // todo abholung / bringen

        this.calculateCosts();
    }


    /*      *** Briefe ***
        1) Standard 0,85€  Länge: 14-23,5cm; Breite: 9-12,5cm; Höhe: bis 0,5cm      Gewicht: bis 20g
        2) Kompakt 1,00€   Länge: 10-23,5cm  Breite: 7-12,5cm; Höhe: bis 1cm        Gewicht: bis 50g
        3) Groß    1,60€   Länge: 10-35,3cm  Breite: 7-25cm    Höhe: bis 2cm        Gewicht: bis 500g
        4) Maxi    2,75€   Länge: 10-35,3cm  Breite: 7-25cm    Höhe: bis 5cm        Gewicht: bis 1kg

            *** Päckchen ***
        1) Päckchen S 3,79€  Länge: min 15, max 35cm  Breite: min 11, max 25cm   Höhe: min 1, max 10cm   Gewicht: bis 2kg
        2) Päckchen M 4,39€  Länge: min 15, max 60cm  Breite: min 11, max 30cm   Höhe: min 1, max 15cm   Gewicht: bis 2kg

            *** Pakete ***
        1) Paket 2kg 4,99€  Länge: bis 60cm  Breite: bis 30cm,  Höhe: bis 15cm  Gewicht: bis 2kg
        2) Paket 5kg 5,99€  Länge: bis 120cm  Breite: bis 60cm, Höhe: bis 60cm, Gewicht: bis 5kg
        3) Paket 10kg 8,49€ Länge: bis 120cm  Breite: bis 60cm  Höhe: bis 60cm  Gewicht: bis 10kg
        4) Paket 31,5kg 16,49€  Länge: bis 120cm  Breite: bis 60cm  Höhe: bis 60cm  Gewicht: bis 31,5kg
    */

    public calculateCosts() {

        if (this.package.weight > 0 && this.package.weight <= 20) {
            this.packageCosts = 0.85;
        } else if (this.package.weight > 20 && this.package.weight <= 50) {
            this.packageCosts = 1.00;
        } else if (this.package.weight > 50 && this.package.weight <= 500) {
            this.packageCosts = 1.60;
        } else if (this.package.weight > 500 && this.package.weight <= 1000) {
            this.packageCosts = 2.75;
        } else if (this.package.weight > 1000 && this.package.weight <= 2000) {
            // päckchen oder paket bis 2kg#
            this.packageCosts = 3.79;
        } else if (this.package.weight > 2000 && this.package.weight <= 5000) {
            this.packageCosts = 5.99;
        } else if (this.package.weight > 5000 && this.package.weight <= 10000) {
            this.packageCosts = 8.49;
        } else if (this.package.weight > 10000 && this.package.weight <= 31500) {
            this.packageCosts = 16.49;
        }

        this.shippingCosts = (this.pickupForm.value === 'pickup') ? 5 : 0;

        this.sumCosts = this.packageCosts + this.shippingCosts;

        this.pickup.desiredPickupDate = this.pickupDate.value;
        this.pickup.desiredPickupDate.setHours(Number(this.pickupTime.value.slice(0, 2)), Number(this.pickupTime.value.slice(3, 5)));
    }

    public createNewOrder(): void {
        this.package.price = this.sumCosts;
        this.order.customer = this.receiver;
        this.order.package = this.package;
        this.order.paymentMethod = this.payment.value;

        let orderToSend: OrderDto = new OrderDto();
        orderToSend.customer = this.customer;
        orderToSend.pack = this.package;
        orderToSend.destAddress = this.receiverAddress;
        orderToSend.srcAddress = this.senderAddress;
        orderToSend.paymentMethod = this.payment.value;
        orderToSend.isPickup = (this.pickupForm.value === 'pickup');
        orderToSend.pickupDate = this.pickupDate.value;
        // send order to backend
        this.orderService.createNewOrder(orderToSend).subscribe(response => {
            console.log(response);
            const deliveryId = response.data[0];

            if (!response.hasError && response.data.length > 0) {
                let dialogRef = this.dialog.open(SuccessDialogComponent, {
                    panelClass: 'modal-container'
                })

                dialogRef.afterClosed().subscribe( () => {
                    // create confirmation pdf
                    this.confirmationService.createConfirmationPDF(this.customer, this.receiver, this.package, orderToSend, deliveryId);
                })
            }
        })

    }

    public validateSenderAddress(stepper: MatStepper): void {
        this.setAddresses();

        this.addressValidationService.validateAddress(this.senderAddress.streetNumber, this.senderAddress.streetName,
            this.senderAddress.zipCode, this.senderAddress.city, this.senderAddress.country).subscribe(response => {
            response = JSON.parse(response);
            console.log(response);
            if (response.results[0].rank.confidence === 1 && response.results[0].rank.confidence_city_level === 1
                && response.results[0].rank.confidence_street_level === 1
                && response.results[0].city.includes(response.query.parsed.city)
                && response.query.parsed.postcode === response.results[0].postcode) {

                // Adresse in der Theorie gültig --> Empfaenger-Adresse checken
                this.validateEmpfaengerAddress(stepper);
            } else {
                // eingegebene Adresse nicht gültig
                this.dialog.open(TrackingDialogComponent, {
                    data: {
                        title: 'Adresse ungültig',
                        content: 'Die eingegebene Versender-Adresse konnte keiner realen Adresse zugeordnet werden. Bitte überprüfen Sie Ihre Eingabe und versuchen Sie es erneut.'
                    },
                    panelClass: 'modal-container'
                })
            }
        })
    }

    public validateEmpfaengerAddress(stepper: MatStepper): void {
        this.setAddresses();

        this.addressValidationService.validateAddress(this.receiverAddress.streetNumber, this.receiverAddress.streetName,
            this.receiverAddress.zipCode, this.receiverAddress.city, this.receiverAddress.country).subscribe(response => {
            response = JSON.parse(response);
            console.log(response);
            if (response.results[0].rank.confidence === 1 && response.results[0].rank.confidence_city_level === 1
                && response.results[0].rank.confidence_street_level === 1
                && response.results[0].city.includes(response.query.parsed.city)
                && response.query.parsed.postcode === response.results[0].postcode) {

                // Adresse in der Theorie gültig --> matStepNext
                stepper.next();
            } else {
                // eingegebene Adresse nicht gültig
                this.dialog.open(TrackingDialogComponent, {
                    data: {
                        title: 'Adresse ungültig',
                        content: 'Die eingegebene Empfänger-Adresse konnte keiner realen Adresse zugeordnet werden. Bitte überprüfen Sie Ihre Eingabe und versuchen Sie es erneut.'
                    },
                    panelClass: 'modal-container'
                })
            }
        })
    }

    public checkPostalCodeForPickUp(): void {

        if (this.freiburgPostalCodes.includes(this.senderAddress.zipCode)) {
            this.showPickupConfig = true
        } else {
            this.showPickupConfig = false;
            this.dialog.open(TrackingDialogComponent, {
                data: {
                    title: 'Abholung bei Ihnen zuhause nicht möglich',
                    content: 'Die Möglichkeit zum Abholen von Paketen besteht nur im Zustellradius der Trouvaille Delivery GmbH,' +
                        ' der die folgenden Postleitzahlen im Raum Freiburg beinhaltet: 79098, 79100, 79102, 79104, 79106, 79108, 19110, 79111, 79112, 79114.'
                },
                panelClass: 'modal-container'
            })
        }
    }

}
