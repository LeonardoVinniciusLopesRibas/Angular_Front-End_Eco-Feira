import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioprefeituradetailsComponent } from './usuarioprefeituradetails.component';

describe('UsuarioprefeituradetailsComponent', () => {
  let component: UsuarioprefeituradetailsComponent;
  let fixture: ComponentFixture<UsuarioprefeituradetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioprefeituradetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioprefeituradetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
