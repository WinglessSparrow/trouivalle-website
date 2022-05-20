import {TestBed} from '@angular/core/testing';

import {AddressValidationService} from './address-validation.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AddressValidationService', () => {
    let service: AddressValidationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(AddressValidationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
