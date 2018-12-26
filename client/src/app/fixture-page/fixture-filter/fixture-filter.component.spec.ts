import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureFilterComponent } from './fixture-filter.component';

describe('FixtureFilterComponent', () => {
  let component: FixtureFilterComponent;
  let fixture: ComponentFixture<FixtureFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixtureFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixtureFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
