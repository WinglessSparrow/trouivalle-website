import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderComponent} from './order.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {element} from "protractor";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('OrderComponent', () => {
    let component: OrderComponent;
    let fixture: ComponentFixture<OrderComponent>;
    let el: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OrderComponent],
            imports: [
                HttpClientTestingModule,
                MatDialogModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('plz with 6 digits should be invalid', () => {
        component.sender.get('postalCode')?.setValue('111111');
        expect(component.sender.get('postalCode')?.valid).toEqual(false);
    })

    it('plz with 4 digits should be invalid', () => {
        component.sender.get('postalCode')?.setValue('1122');
        expect(component.sender.get('postalCode')?.valid).toEqual(false);
    })

    it('plz with 0 on the start', () => {
        component.sender.get('postalCode')?.setValue('00000');
        expect(component.sender.get('postalCode')?.valid).toEqual(false);
    })

    it('keine Sonderzeichen im Vornamen erlaubt', () => {
        component.sender.get('firstName')?.setValue('.,?=)/&%$§"!<');
        expect(component.sender.get('firstName')?.valid).toEqual(false);
    })

    it('keine Sonderzeichen im Nachnamen erlaubt', () => {
        component.sender.get('lastName')?.setValue('.,?=)/&%$§"!<');
        expect(component.sender.get('lastName')?.valid).toEqual(false);
    })

    it('no valid email', () => {
        component.sender.get('email')?.setValue('blabla@blabal');
        expect(component.sender.get('email')?.valid).toEqual(false);
    })

    it('value 0  houseNumber not allowed', () => {
        component.sender.get('houseNumber')?.setValue('0');
        expect(component.sender.get('houseNumber')?.valid).toEqual(false);
    })

    it('should show \"Weiter zu den Paketdaten\" Button', () => {
        component.sender.get("firstName")?.setValue("Tom");
        component.sender.get("lastName")?.setValue("Maier");
        component.sender.get("email")?.setValue("sadfaf@gmail.com");
        component.sender.get("postalCode")?.setValue("99999");
        component.sender.get("city")?.setValue("Offenburg");
        component.sender.get("country")?.setValue("Deutschland");
        component.sender.get("houseNumber")?.setValue("15");
        component.sender.get("street")?.setValue("Hauptstraße");
        component.receiverGroup.get("firstName")?.setValue("Tim");
        component.receiverGroup.get("lastName")?.setValue("Mayer");
        component.receiverGroup.get("email")?.setValue("ssaf@gmail.com");
        component.receiverGroup.get("postalCode")?.setValue("99999");
        component.receiverGroup.get("city")?.setValue("Offenburg");
        component.receiverGroup.get("country")?.setValue("Deutschland");
        component.receiverGroup.get("houseNumber")?.setValue("20");
        component.receiverGroup.get("street")?.setValue("Nebenstraße");

        const addButton = fixture.debugElement.nativeElement.querySelector('.start-validation-button');
        expect(addButton.disabled).toBeFalsy();
    })

    it('should show \"Weiter zur Bezahlung\" Button', () => {
        component.packageForm.get("height")?.setValue("20");
        component.packageForm.get("width")?.setValue("20");
        component.packageForm.get("depth")?.setValue("20");
        component.packageForm.get("weight")?.setValue("20000");

        component.senderAddress.zipCode = '79180';
        component.checkPostalCodeForPickUp();

        const continueButton = fixture.debugElement.nativeElement.querySelector('.zur-bezahlung-button');
        expect(continueButton.disabled).toBeFalsy();
    })

    it('show DateTimePicker when pickup is selected', () => {
        component.pickupForm.setValue('pickup');

        const pickupDateTimePicker = fixture.debugElement.nativeElement.querySelector('.pickup-container');
        expect(pickupDateTimePicker).toBeNull();
    })

});
