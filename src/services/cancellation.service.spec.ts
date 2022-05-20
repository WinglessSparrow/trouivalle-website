import {TestBed} from '@angular/core/testing';

import {CancellationService} from './cancellation.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CancellationService', () => {
    let service: CancellationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(CancellationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
