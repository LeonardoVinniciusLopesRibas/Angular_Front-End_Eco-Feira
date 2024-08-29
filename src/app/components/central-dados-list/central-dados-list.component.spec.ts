import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralDadosListComponent } from './central-dados-list.component';

describe('CentralDadosListComponent', () => {
  let component: CentralDadosListComponent;
  let fixture: ComponentFixture<CentralDadosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentralDadosListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CentralDadosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
