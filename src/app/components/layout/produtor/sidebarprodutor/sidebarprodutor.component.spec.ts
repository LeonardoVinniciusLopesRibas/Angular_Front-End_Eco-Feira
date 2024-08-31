import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarprodutorComponent } from './sidebarprodutor.component';

describe('SidebarprodutorComponent', () => {
  let component: SidebarprodutorComponent;
  let fixture: ComponentFixture<SidebarprodutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarprodutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarprodutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
