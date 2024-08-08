import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Simple2Component } from './simple-2.component';

describe('Simple2Component', () => {
  let component: Simple2Component;
  let fixture: ComponentFixture<Simple2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Simple2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Simple2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
