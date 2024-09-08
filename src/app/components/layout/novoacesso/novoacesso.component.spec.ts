import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoacessoComponent } from './novoacesso.component';

describe('NovoacessoComponent', () => {
  let component: NovoacessoComponent;
  let fixture: ComponentFixture<NovoacessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoacessoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NovoacessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
