import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HusqComponent } from './husq.component';

describe('HusqComponent', () => {
  let component: HusqComponent;
  let fixture: ComponentFixture<HusqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HusqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HusqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
