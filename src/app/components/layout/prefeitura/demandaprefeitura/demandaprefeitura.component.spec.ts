import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandaprefeituraComponent } from './demandaprefeitura.component';

describe('DemandaprefeituraComponent', () => {
  let component: DemandaprefeituraComponent;
  let fixture: ComponentFixture<DemandaprefeituraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandaprefeituraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandaprefeituraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
