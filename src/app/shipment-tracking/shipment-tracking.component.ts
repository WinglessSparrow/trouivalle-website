import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {icon, Marker} from 'leaflet';
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TrackingDialogComponent} from "../modal/tracking-dialog/tracking-dialog.component";
import {TrackingService} from "../../services/tracking.service";
import {Coordinate} from "../models/Coordinate";
import {PackageStateEnum} from "../models/PackageStateEnum";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";

declare var require: any;


@Component({
    selector: 'shipment-tracking',
    templateUrl: './shipment-tracking.component.html',
    styleUrls: ['./shipment-tracking.component.scss']
})
export class ShipmentTrackingComponent implements OnInit, AfterViewInit {

    faCheck = faCheck;
    faXmark = faXmark;

    private map: any;

    public trackingId!: number;
    public headquarter!: Coordinate;
    public destination!: Coordinate;
    public status!: PackageStateEnum;
    public isPickup!: boolean;
    public information = 'NO_PROBLEMS';

    trackingForm = new FormControl("", [
        Validators.required,
        // Validators.pattern("[0-9]*")
    ])

    constructor(private route: ActivatedRoute, private dialog: MatDialog, private trackingService: TrackingService) {
    }

    ngOnInit(): void {
        this.headquarter = new Coordinate();
        this.headquarter.longitude = 7.8;
        this.headquarter.latitude = 47.99;
        this.destination = new Coordinate();
        this.destination.longitude = 7.85;
        this.destination.latitude = 48;
    }

    ngAfterViewInit(): void {
        this.initMap();
        this.route.queryParams.subscribe(params => {
            this.trackingId = params['trackingId'];
            this.trackingForm.setValue(this.trackingId);
            this.getDeliveryStatus();
        })
    }

    private initMap(): void {
        let iconRetinaUrl = 'assets/marker-icon-2x.png';
        let iconUrl = 'assets/marker-icon.png';
        let shadowUrl = 'assets/marker-shadow.png';
        const iconDefault = icon({
            iconRetinaUrl,
            iconUrl,
            shadowUrl,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
        });
        Marker.prototype.options.icon = iconDefault;

        this.map = L.map('map', {
            center: [47.9990077, 7.8421043],
            zoom: 3
        });

        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 8,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        this.map.setZoom(13);
        tiles.addTo(this.map);

    }

    public getDeliveryStatus(): void {
        this.isPickup = false;
        this.trackingId = this.trackingForm.value;
        let trackingId = this.trackingId;

        // delivery-status von backend anfordern
        this.trackingService.getPackageHistory(this.trackingId.toString()).subscribe(response => {
            if (response.hasError) {
                this.openDialog();
            } else {
                if (response.data[0].some((s: { status: PackageStateEnum; }) => s.status === 'REQUESTED_PICKUP') === true || response.data[0].some((s: { status: PackageStateEnum; }) => s.status === 'PICKED_UP') === true) {
                    this.isPickup = true;
                }

                this.setInformation(response.data[0][0].status);
                // aktuellsten Status aus dem history-Array rausnehmen
                this.status = response.data[0][0].status;
            }
        },
            error => {
                this.openDialog();
            })
        this.getPackageLocation();
    }

    public setInformation(status: PackageStateEnum): void {
        this.information = 'NO_PROBLEMS';
        switch (status) {
            case PackageStateEnum.REDIRECTED_TO_DHL:
                this.information = 'Die Sendungsverfolgung läuft ab jetzt über DHL. Bitte benutzen Sie die von' +
                    ' uns erhaltene Sendungsverfolgungsnummer auf der folgenden Website: https://www.dhl.de/de/privatkunden/dhl-sendungsverfolgung.html'
                break;
            case PackageStateEnum.ADDRESS_NOT_FOUND:
                this.information = 'Die Lieferadresse konnte nicht gefunden werden. Bitte wenden Sie sich an unseren Support, um weitere Schritte einzuleiten.'
                break;
            case PackageStateEnum.PICKUP_FAILED:
                this.information = 'Die Abholung bei Ihnen zuhause war leider erfolglos. Bitte wenden Sie sich an unseren Support, um einen neuen Termin auszumachen.'
                    break;
            case PackageStateEnum.CANCELED:
                this.information = 'Bitte wenden Sie sich an unseren Support, um weitere Schritte einzuleiten.'
                break;
            case PackageStateEnum.DELIVERY_FAILED:
                this.information = 'Es gab Probleme bei der Auslieferung. Bitte wenden Sie sich an unseren Support, um weitere Schritte einzuleiten.'
        }
    }

    public getPackageLocation(): void {
        // todo backend call für aktuelle Position

        // clear map before adding new markers
        this.map.eachLayer((layer: any) => {
            if (layer['_latlng'] != undefined)
                layer.remove();
        });

        // Ausschnitt auf der Karte setzen
        L.marker([47.99, 7.8]).addTo(this.map)
            .bindPopup('Headquarter Trouvaille Deliveries', {autoClose: false})
            .openPopup();

        L.marker([48, 7.85]).addTo(this.map)
            .bindPopup('Ihre Lieferung', {autoClose: false})
            .openPopup();

        // Add route (polyline) from start to end to map
        this.trackingService.getRouteFromOsrm(this.headquarter, this.destination).subscribe(jsonRoute => {
            let route = JSON.parse(jsonRoute);
            let polyUtil = require('polyline-encoded');
            const latlngs = polyUtil.decode(route.routes[0].geometry, 5);
            L.polyline(latlngs).addTo(this.map);
        })
    }

    public openDialog(): void {

        this.dialog.open(TrackingDialogComponent, {
            data: {
                title: 'Fehler bei der Sendungsverfolgung',
                content: 'Die von Ihnen eingegebene Sendungsnummer wurde im System nicht gefunden'
            }
        })
    }
}
