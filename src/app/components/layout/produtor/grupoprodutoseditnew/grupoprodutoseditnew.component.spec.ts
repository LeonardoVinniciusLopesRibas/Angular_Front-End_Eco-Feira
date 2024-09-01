import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoprodutoseditnewComponent } from './grupoprodutoseditnew.component';

describe('GrupoprodutoseditnewComponent', () => {
  let component: GrupoprodutoseditnewComponent;
  let fixture: ComponentFixture<GrupoprodutoseditnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoprodutoseditnewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupoprodutoseditnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
