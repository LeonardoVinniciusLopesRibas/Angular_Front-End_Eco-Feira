import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoprefeituradetailsComponent } from './produtoprefeituradetails.component';

describe('ProdutoprefeituradetailsComponent', () => {
  let component: ProdutoprefeituradetailsComponent;
  let fixture: ComponentFixture<ProdutoprefeituradetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoprefeituradetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdutoprefeituradetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
