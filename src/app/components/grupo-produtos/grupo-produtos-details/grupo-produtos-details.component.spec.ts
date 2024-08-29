import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoProdutosDetailsComponent } from './grupo-produtos-details.component';

describe('GrupoProdutosDetailsComponent', () => {
  let component: GrupoProdutosDetailsComponent;
  let fixture: ComponentFixture<GrupoProdutosDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoProdutosDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupoProdutosDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
