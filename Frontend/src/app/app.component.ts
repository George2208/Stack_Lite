import { Component } from '@angular/core';
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

  constructor(private authService: AuthService) {
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
  }
}
