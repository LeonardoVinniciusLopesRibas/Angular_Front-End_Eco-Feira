import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralDemandasListComponent } from './central-demandas-list.component';

describe('CentralDemandasListComponent', () => {
  let component: CentralDemandasListComponent;
  let fixture: ComponentFixture<CentralDemandasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentralDemandasListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CentralDemandasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
