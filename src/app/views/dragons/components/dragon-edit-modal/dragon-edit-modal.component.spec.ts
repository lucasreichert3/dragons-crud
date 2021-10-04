import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragonFormModule } from '../dragon-form/dragon-form.module';

import { DragonEditModalComponent } from './dragon-edit-modal.component';

describe('DragonEditModalComponent', () => {
  let component: DragonEditModalComponent;
  let fixture: ComponentFixture<DragonEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragonEditModalComponent ],
      imports: [DragonFormModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

  describe('getModalTitle', () => {
    it('creating', () => {
      expect(component.getModalTitle()).toEqual('Criar novo dragão')
    })
    it('editing', () => {
      component.dragon = { id: '1', name: 'test', type: 'test', avatar: 'test', createdAt: Date.now().toString() }
      expect(component.getModalTitle()).toEqual('Editando o dragão: test')
    })
  })

  it('should close modal', () => {
    const eventSpy = jest.spyOn(component.modalClosed, 'emit').mockImplementation()
    component.visible = true

    component.closeModal()

    expect(eventSpy).toHaveBeenCalled()
    expect(component.visible).toBeFalsy()
  })
});
