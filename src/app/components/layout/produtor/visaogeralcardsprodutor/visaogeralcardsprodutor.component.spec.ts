import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaogeralcardsprodutorComponent } from './visaogeralcardsprodutor.component';

describe('VisaogeralcardsprodutorComponent', () => {
  let component: VisaogeralcardsprodutorComponent;
  let fixture: ComponentFixture<VisaogeralcardsprodutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisaogeralcardsprodutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisaogeralcardsprodutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
