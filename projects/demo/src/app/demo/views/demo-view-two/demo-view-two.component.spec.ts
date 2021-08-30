import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoViewTwoComponent } from './demo-view-two.component';

describe('DemoViewTwoComponent', () => {
  let component: DemoViewTwoComponent;
  let fixture: ComponentFixture<DemoViewTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoViewTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoViewTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
