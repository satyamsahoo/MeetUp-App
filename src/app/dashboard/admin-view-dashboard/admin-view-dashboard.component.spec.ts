import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewDashboardComponent } from './admin-view-dashboard.component';

describe('AdminViewDashboardComponent', () => {
  let component: AdminViewDashboardComponent;
  let fixture: ComponentFixture<AdminViewDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
