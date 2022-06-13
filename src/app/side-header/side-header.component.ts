import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'side-header',
    templateUrl: './side-header.component.html',
    styleUrls: ['./side-header.component.scss'],
})
export class SideHeaderComponent {
    constructor(private router: Router) {}

    goHome() {
        this.router.navigateByUrl('/');
    }
}
