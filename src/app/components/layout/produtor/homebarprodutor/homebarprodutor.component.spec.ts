import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebarprodutorComponent } from './homebarprodutor.component';

describe('HomebarprodutorComponent', () => {
  let component: HomebarprodutorComponent;
  let fixture: ComponentFixture<HomebarprodutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomebarprodutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomebarprodutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
