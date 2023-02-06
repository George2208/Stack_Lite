import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  
  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) {}

  ngOnInit(): void {
    this.authService.getAll().subscribe(data => {
      console.log(data)
    })
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmpass: ['', Validators.required]
    });
  }

  registerUser() {
    console.log(this.registerForm)
    if(this.registerForm.value.password === this.registerForm.value.confirmpass) {
      this.authService.register(this.registerForm.value).subscribe(data => {
        console.log(data)
      })
    }
    this.authService.addUserToLocalCache(this.registerForm.value)
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then(result=>{
      this.router.navigate(['/profile'])
      // window.location.reload()
    })

  }

}
