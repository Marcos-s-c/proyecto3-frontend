import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavLandingComponent } from './main-nav-landing.component';

describe('MainNavLandingComponent', () => {
  let component: MainNavLandingComponent;
  let fixture: ComponentFixture<MainNavLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainNavLandingComponent]
    });
    fixture = TestBed.createComponent(MainNavLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
