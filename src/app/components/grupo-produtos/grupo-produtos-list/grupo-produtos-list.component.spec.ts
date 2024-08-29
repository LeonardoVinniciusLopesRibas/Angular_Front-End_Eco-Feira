import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoProdutosListComponent } from './grupo-produtos-list.component';

describe('GrupoProdutosListComponent', () => {
  let component: GrupoProdutosListComponent;
  let fixture: ComponentFixture<GrupoProdutosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoProdutosListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupoProdutosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
