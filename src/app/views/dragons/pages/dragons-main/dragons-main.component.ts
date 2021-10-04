import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-dragons-main',
  templateUrl: './dragons-main.component.html',
  styleUrls: ['./dragons-main.component.scss']
})
export class DragonsMainComponent implements OnInit {

  faSignOutAlt = faSignOutAlt;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/'])
  }

}
