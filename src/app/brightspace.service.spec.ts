import { TestBed } from '@angular/core/testing';

import { BrightspaceService } from './brightspace.service';

describe('BrightspaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrightspaceService = TestBed.get(BrightspaceService);
    expect(service).toBeTruthy();
  });
});
