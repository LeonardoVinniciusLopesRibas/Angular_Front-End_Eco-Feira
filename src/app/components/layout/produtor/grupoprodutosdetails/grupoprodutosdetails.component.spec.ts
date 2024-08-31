import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoprodutosdetailsComponent } from './grupoprodutosdetails.component';

describe('GrupoprodutosdetailsComponent', () => {
  let component: GrupoprodutosdetailsComponent;
  let fixture: ComponentFixture<GrupoprodutosdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoprodutosdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupoprodutosdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
