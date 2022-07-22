import { TestBed } from '@angular/core/testing';

import { User.RepositoryService } from './user.repository.service';

describe('User.RepositoryService', () => {
  let service: User.RepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(User.RepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
