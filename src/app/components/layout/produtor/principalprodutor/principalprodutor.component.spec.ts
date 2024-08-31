import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalprodutorComponent } from './principalprodutor.component';

describe('PrincipalprodutorComponent', () => {
  let component: PrincipalprodutorComponent;
  let fixture: ComponentFixture<PrincipalprodutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalprodutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrincipalprodutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
