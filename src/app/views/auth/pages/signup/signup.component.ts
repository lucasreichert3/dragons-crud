import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../auth.model';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  createAccount(user: User) {
    try {
      this.authService.createUser(user);
      this.router.navigate(['/dragons']);
    } catch (err) {
      this.toastr.error(
        'Já existe este email cadastrado!',
        'Problema ao criar conta!'
      );
    }
  }
}
