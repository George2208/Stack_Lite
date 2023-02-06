import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';

  user: any
  isLoggedIn: boolean;
  JSON: any;

  constructor(private authService: AuthService,
    private router: Router) {
    this.user = this.authService.getUserFromLocalCache()
    if(this.user.username) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
    console.log(this.isLoggedIn)
    console.log(this.user)
  }

  logout() {
    console.log(1)
    this.isLoggedIn = false;
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
