import { TestBed } from '@angular/core/testing';

import { NovoacessoService } from './novoacesso.service';

describe('NovoacessoService', () => {
  let service: NovoacessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovoacessoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

