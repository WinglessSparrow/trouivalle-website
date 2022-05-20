import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CancellationService {

    constructor(private httpClient: HttpClient) {
    }


    public cancelDelivery(): Observable<any> {


        return new Observable<any>();
    }
}
