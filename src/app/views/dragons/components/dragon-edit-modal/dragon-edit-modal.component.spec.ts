import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonEditModalComponent } from './dragon-edit-modal.component';

describe('DragonEditModalComponent', () => {
  let component: DragonEditModalComponent;
  let fixture: ComponentFixture<DragonEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragonEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
