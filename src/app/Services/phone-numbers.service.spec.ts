import { TestBed } from '@angular/core/testing';
import { PhoneNumbersService } from './phone-numbers.service';



describe('PhoneNumbersService', () => {
  let service: PhoneNumbersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneNumbersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
