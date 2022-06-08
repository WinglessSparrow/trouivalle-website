import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

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

    public cancelDelivery(): Observable<any> {


        return new Observable<any>();
    }
}
