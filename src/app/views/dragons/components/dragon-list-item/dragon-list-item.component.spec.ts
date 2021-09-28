import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonListItemComponent } from './dragon-list-item.component';

describe('DragonListItemComponent', () => {
  let component: DragonListItemComponent;
  let fixture: ComponentFixture<DragonListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragonListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
