import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Coordinate} from "../app/models/Coordinate";
import {GlobalResponseModel} from "../app/models/GlobalResponseModel";
import {environment} from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TrackingService {

    constructor(private httpClient: HttpClient) {
    }

    public getHttpOptions(): {} {
        return {
            headers: new HttpHeaders({'Content-Type': 'application/json'}),
            responseType: 'application/json'
        }
    }

    public getRouteFromOsrm(start: Coordinate, end: Coordinate): Observable<any> {

        return this.httpClient.get(`http://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}`, this.getHttpOptions());
    }

    public getPackageHistory(packageId: string): Observable<GlobalResponseModel> {
        return this.httpClient.get<any>(`${environment.baseUrl}/api/deliveries/history/${packageId}`, this.getHttpOptions())
            .pipe(map(response => new GlobalResponseModel(JSON.parse(response))));
    }
}
