import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AddressValidationService {

    //private geoapifyApiKey = "8923fefc90c24aa1bbe6bb22b302d39b";
    private geoapifyApiKey = "2a50c3b79a1e45c691bc508d8ffc8da8";

    constructor(private http: HttpClient) {
    }


    public getHttpOptions(): {} {
        return {
            headers: new HttpHeaders({'Content-Type': 'application/json'}),
            responseType: 'application/json'
        }
    }

    public validateAddress(houseNumber: string, street: string, zipCode: string, city: string, country: string,): Observable<any> {

        return this.http.get(`https://api.geoapify.com/v1/geocode/search?housenumber=${houseNumber}&street=${street}&postcode=${zipCode}&city=${city}&country=${country}
                            &lang=de&limit=1&filter=countrycode:de&format=json&apiKey=${this.geoapifyApiKey}`, this.getHttpOptions());
    }
}
