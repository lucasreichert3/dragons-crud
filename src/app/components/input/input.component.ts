import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() id: string | undefined;
  @Input() type = 'text';
  @Input() label: string | undefined;
  @Input() formGroup!: FormGroup;
  @Input() name!: string;
  @Input() errorMessages!: ValidationErrors;

  constructor() {}

  ngOnInit(): void {}

  getErrorMessagesList(): string[] {
    return Object.keys(this.getFormField(this.name)?.errors || {}).map(
      (error) => this.errorMessages[error]
    );
  }

  getFormField(key: string): AbstractControl | null {
    return this.formGroup.get(key);
  }

  validateField(name: string): boolean {
    const field = this.getFormField(name);
    return field != null && field.errors != null && field.dirty === true;
  }
}
