import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerirdemandaComponent } from './gerirdemanda.component';

describe('GerirdemandaComponent', () => {
  let component: GerirdemandaComponent;
  let fixture: ComponentFixture<GerirdemandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerirdemandaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerirdemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
