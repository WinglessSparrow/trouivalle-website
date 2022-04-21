import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'shipment-tracking',
    templateUrl: './shipment-tracking.component.html',
    styleUrls: ['./shipment-tracking.component.scss']
})
export class ShipmentTrackingComponent implements OnInit, AfterViewInit {

    private map: any;

    public trackingId!: number;

    trackingForm = new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]*")
    ])

    constructor(public route: ActivatedRoute) {
    }

    ngOnInit(): void {

        this.route.queryParams.subscribe(params => {
            console.log(params);
            this.trackingId = params['trackingId'];
            this.getDeliveryStatus();
        })
    }

    ngAfterViewInit(): void {
        this.initMap();
    }

    private initMap(): void {
        this.map = L.map('map', {
            center: [47.9990077, 7.8421043],
            zoom: 3
        });

        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 13,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        L.marker([47.99, 7.8]).addTo(this.map)
            .bindPopup('Headquarter Trouvaille Deliveries')
            .openPopup();

        L.marker([48, 7.85]).addTo(this.map)
            .bindPopup('Ihre Lieferung')
            .openPopup();

        tiles.addTo(this.map);
    }

    public getDeliveryStatus(): void {

        let trackingId = this.trackingId;
        console.log("getDeliveryStatus mit trackingId: " + trackingId);

        this.getPackageLocation();
    }

    public getPackageLocation(): void {
        // todo backend call

        // Ausschnitt auf der Karte setzen
    }
}
