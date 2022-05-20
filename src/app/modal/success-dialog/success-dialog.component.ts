import {Component, OnInit} from '@angular/core';
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'success-dialog',
    templateUrl: './success-dialog.component.html',
    styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent implements OnInit {

    faCircleCheck = faCircleCheck;

    constructor() {
    }

    ngOnInit(): void {
    }

}
