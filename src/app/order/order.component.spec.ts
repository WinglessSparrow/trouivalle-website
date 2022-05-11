import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderComponent} from './order.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";

describe('OrderComponent', () => {
    let component: OrderComponent;
    let fixture: ComponentFixture<OrderComponent>;

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

    it('')
});
