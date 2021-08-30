import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoViewOneComponent } from './demo-view-one.component';

describe('DemoViewOneComponent', () => {
  let component: DemoViewOneComponent;
  let fixture: ComponentFixture<DemoViewOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoViewOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoViewOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
