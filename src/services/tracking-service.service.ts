import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Coordinate} from "../app/models/Coordinate";

@Injectable({
    providedIn: 'root'
})
export class TrackingServiceService {

    constructor(private http: HttpClient) {
    }

    public getHttpOptions(): {} {
        return {
            headers: new HttpHeaders({'Content-Type': 'application/json'}),
            responseType: 'application/json'
        }
    }

    public getRouteFromOsrm(start: Coordinate, end: Coordinate): Observable<any> {

        return this.http.get(`http://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}`, this.getHttpOptions());
    }
}
