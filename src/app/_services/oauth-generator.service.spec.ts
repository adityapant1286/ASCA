import { TestBed } from '@angular/core/testing';

import { OauthGeneratorService } from './oauth-generator.service';

describe('OauthGeneratorService', () => {
  let service: OauthGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OauthGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
