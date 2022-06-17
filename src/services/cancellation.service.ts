import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../environments/environment";
import {GlobalResponseModel} from "../app/models/GlobalResponseModel";

@Injectable({
    providedIn: 'root'
})
export class CancellationService {

    constructor(private httpClient: HttpClient) {
    }

    public getHttpOptions(): {} {
        return {
            headers: new HttpHeaders({'Content-Type': 'application/json'}),
            responseType: 'application/json'
        }
    }

    public cancelDelivery(deliveryId: number): Observable<any> {
        return this.httpClient.put<any>(`${environment.baseUrl}/api/deliveries/cancel/${deliveryId}`, this.getHttpOptions());
    }
}
