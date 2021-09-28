import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonsMainComponent } from './dragons-main.component';

describe('DragonsMainComponent', () => {
  let component: DragonsMainComponent;
  let fixture: ComponentFixture<DragonsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragonsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
