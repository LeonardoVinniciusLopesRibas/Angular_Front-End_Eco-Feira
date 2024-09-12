import { TestBed } from '@angular/core/testing';

import { ProdutoprodutorService } from './produtoprodutor.service';

describe('ProdutoprodutorService', () => {
  let service: ProdutoprodutorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoprodutorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
