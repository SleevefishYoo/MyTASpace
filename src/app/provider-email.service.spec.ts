import { TestBed } from '@angular/core/testing';

import { ProviderEmailService } from './provider-email.service';

describe('ProviderEmailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProviderEmailService = TestBed.get(ProviderEmailService);
    expect(service).toBeTruthy();
  });
});
