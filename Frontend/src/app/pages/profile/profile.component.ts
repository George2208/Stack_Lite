import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: any
  username: string | undefined
  questionForm!: FormGroup;

  constructor(private authService: AuthService,
    private fb: FormBuilder) {
    
  }

  ngOnInit() {

    this.user = this.authService.getUserFromLocalCache()
    this.username = this.user.username
    this.questionForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    })
  }

}
