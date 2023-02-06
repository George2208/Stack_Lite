import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    console.log('login')
      this.authService.login(this.loginForm.value).subscribe(data => {
        console.log(data)
      })
    this.authService.addUserToLocalCache(this.loginForm.value)
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then(result=>{
      this.router.navigate(['/profile'])
      // window.location.reload()
    })
    window.location.reload()
  }


}