import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {faTriangleExclamation, faCircleCheck} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'cancellation',
    templateUrl: './cancellation.component.html',
    styleUrls: ['./cancellation.component.scss']
})
export class CancellationComponent implements OnInit {

    faTriangleExclamation = faTriangleExclamation;
    faCircleCheck = faCircleCheck;

    public deliveryId!: number;
    public cancelled!: boolean;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.cancelled = true;
        this.route.queryParams.subscribe(params => {
            this.deliveryId = params['deliveryId'];
            this.cancelDelivery();
        })
    }

    public cancelDelivery(): void {

    }

}
