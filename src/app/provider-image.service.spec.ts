import { TestBed } from '@angular/core/testing';

import { ProviderImageService } from './provider-image.service';

describe('ProviderImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProviderImageService = TestBed.get(ProviderImageService);
    expect(service).toBeTruthy();
  });
});
