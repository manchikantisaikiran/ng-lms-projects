import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideBudgetComponent } from './provide-budget.component';

describe('ProvideBudgetComponent', () => {
  let component: ProvideBudgetComponent;
  let fixture: ComponentFixture<ProvideBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvideBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvideBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
