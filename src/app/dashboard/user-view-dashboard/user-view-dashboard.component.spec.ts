import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewDashboardComponent } from './user-view-dashboard.component';

describe('UserViewDashboardComponent', () => {
  let component: UserViewDashboardComponent;
  let fixture: ComponentFixture<UserViewDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserViewDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
