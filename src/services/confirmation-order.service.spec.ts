import { TestBed } from '@angular/core/testing';

import { ConfirmationOrderService } from './confirmation-order.service';

describe('ConfirmationOrderService', () => {
  let service: ConfirmationOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
