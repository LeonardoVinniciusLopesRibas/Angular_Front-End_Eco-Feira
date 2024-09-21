import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalprefeituraComponent } from './principalprefeitura.component';

describe('PrincipalprefeituraComponent', () => {
  let component: PrincipalprefeituraComponent;
  let fixture: ComponentFixture<PrincipalprefeituraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalprefeituraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrincipalprefeituraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
