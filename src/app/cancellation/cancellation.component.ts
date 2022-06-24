import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {faTriangleExclamation, faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {CancellationService} from "../../services/cancellation.service";

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

    constructor(private route: ActivatedRoute, private cancellationService: CancellationService) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.deliveryId = params['deliveryId'];
            this.cancelDelivery();
        })
    }

    public cancelDelivery(): void {
        this.cancellationService.cancelDelivery(this.deliveryId).subscribe(response => {
                this.cancelled = !response.hasError;
            }
            ,
            error => {
                this.cancelled = false;
            })

        // if cancellation went through -> this.cancelled = true
        // else this.cancelled = false
    }

}
