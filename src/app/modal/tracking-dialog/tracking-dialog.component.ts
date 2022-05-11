import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
    selector: 'tracking-dialog',
    templateUrl: './tracking-dialog.component.html',
    styleUrls: ['./tracking-dialog.component.scss']
})
export class TrackingDialogComponent implements OnInit {

    public modalTitle = '';
    public modalContent = '';

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        this.modalTitle = this.data.title;
        this.modalContent = this.data.content;
    }

}
