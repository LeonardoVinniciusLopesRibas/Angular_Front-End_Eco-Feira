import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoprefeituraeditnewComponent } from './produtoprefeituraeditnew.component';

describe('ProdutoprefeituraeditnewComponent', () => {
  let component: ProdutoprefeituraeditnewComponent;
  let fixture: ComponentFixture<ProdutoprefeituraeditnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoprefeituraeditnewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdutoprefeituraeditnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
