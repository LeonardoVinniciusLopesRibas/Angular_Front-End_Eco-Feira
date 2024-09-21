import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesprefeituraComponent } from './ajustesprefeitura.component';

describe('AjustesprefeituraComponent', () => {
  let component: AjustesprefeituraComponent;
  let fixture: ComponentFixture<AjustesprefeituraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjustesprefeituraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjustesprefeituraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
