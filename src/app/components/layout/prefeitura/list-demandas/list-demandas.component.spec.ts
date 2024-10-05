import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandasComponent } from './list-demandas.component';

describe('ListDemandasComponent', () => {
  let component: ListDemandasComponent;
  let fixture: ComponentFixture<ListDemandasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDemandasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListDemandasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
