import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShipmentTrackingComponent} from './shipment-tracking.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ShipmentTrackingComponent', () => {
    let component: ShipmentTrackingComponent;
    let fixture: ComponentFixture<ShipmentTrackingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShipmentTrackingComponent],
            imports: [
                RouterTestingModule,
                MatDialogModule,
                HttpClientTestingModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShipmentTrackingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
