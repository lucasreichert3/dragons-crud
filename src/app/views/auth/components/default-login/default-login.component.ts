import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../auth.model';

@Component({
  selector: 'app-default-login',
  templateUrl: './default-login.component.html',
  styleUrls: ['./default-login.component.scss'],
})
export class DefaultLoginComponent implements OnInit {
  loginForm!: FormGroup;
  @Input() buttonText!: string;
  @Output() buttonClick = new EventEmitter<User>();
  @Input() secondaryButtonText!: string;
  @Output() secondaryButtonClick = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  handleButtonClick() {
    const { email, password } = this.loginForm.value;

    if (this.loginForm.valid)
      this.buttonClick.emit({ email, password } as User);
  }
}
