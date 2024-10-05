import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditDemandaComponent } from './new-edit-demanda.component';

describe('NewEditDemandaComponent', () => {
  let component: NewEditDemandaComponent;
  let fixture: ComponentFixture<NewEditDemandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEditDemandaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewEditDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
