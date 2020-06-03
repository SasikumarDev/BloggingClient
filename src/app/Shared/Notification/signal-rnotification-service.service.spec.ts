import { TestBed } from '@angular/core/testing';

import { SignalRNotificationServiceService } from './signal-rnotification-service.service';

describe('SignalRNotificationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignalRNotificationServiceService = TestBed.get(SignalRNotificationServiceService);
    expect(service).toBeTruthy();
  });
});
