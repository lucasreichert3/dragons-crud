import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateAllFields } from 'src/app/utils/validateField';
import { Dragon } from '../../dragons.model';

@Component({
  selector: 'app-dragon-form',
  templateUrl: './dragon-form.component.html',
  styleUrls: ['./dragon-form.component.scss'],
})
export class DragonFormComponent implements OnInit {
  @Input() dragon?: Dragon;
  @Output() saved = new EventEmitter<Dragon>();

  errorMessage = { required: 'Este campo é obrigatório' };

  dragonForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const { name, type, avatar } = this.dragon || {};
    this.dragonForm = this.fb.group({
      name: this.fb.control(name || '', [Validators.required]),
      type: this.fb.control(type || '', [Validators.required]),
      avatar: this.fb.control(avatar || ''),
    });
  }

  handleSave() {
    if (this.dragonForm.invalid) {
      validateAllFields(this.dragonForm)
      return
    }
    const { name, type, avatar } = this.dragonForm.value;
    this.saved.emit(this.dragon);
  }
}
