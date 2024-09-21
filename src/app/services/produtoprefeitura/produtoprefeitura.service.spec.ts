import { TestBed } from '@angular/core/testing';

import { ProdutoprefeituraService } from './produtoprefeitura.service';

describe('ProdutoprefeituraService', () => {
  let service: ProdutoprefeituraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoprefeituraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
