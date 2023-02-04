import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAll().subscribe(data => {
      console.log(data)
    })
  }

}
