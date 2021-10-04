import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has content be true', () => {
    component.content.nativeElement.innerHTML = '<span></span>'
    component.ngOnInit()

    expect(component.hasContent).toBeTruthy()
  })

  it('should has content be false', () => {
    component.content.nativeElement.innerHTML = ''
    component.ngOnInit()

    expect(component.hasContent).toBeFalsy()
  })
});
