import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoeditnewComponent } from './produtoeditnew.component';

describe('ProdutoeditnewComponent', () => {
  let component: ProdutoeditnewComponent;
  let fixture: ComponentFixture<ProdutoeditnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoeditnewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdutoeditnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
