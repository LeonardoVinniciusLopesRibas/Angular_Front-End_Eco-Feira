import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciardemandasComponent } from './gerenciardemandas.component';

describe('GerenciardemandasComponent', () => {
  let component: GerenciardemandasComponent;
  let fixture: ComponentFixture<GerenciardemandasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciardemandasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerenciardemandasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
