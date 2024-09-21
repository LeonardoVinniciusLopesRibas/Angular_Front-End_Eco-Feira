import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarprefeituraComponent } from './sidebarprefeitura.component';

describe('SidebarprefeituraComponent', () => {
  let component: SidebarprefeituraComponent;
  let fixture: ComponentFixture<SidebarprefeituraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarprefeituraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarprefeituraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
