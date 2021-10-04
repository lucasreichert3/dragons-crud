import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../auth.model';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  redirectToSignup(): void {
    this.router.navigate(['/signup']);
  }

  login(user: User) {
    try {
      this.authService.login(user);
      this.router.navigate(['/dragons']);
    } catch (error) {
      this.toastr.error('Usuário ou senha incorreto');
    }
  }
}
