import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: any
  username!: string;
  password!: string;
  questionForm!: FormGroup;
  // today =  new Date()

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private questionService: QuestionService,
    private router: Router,
    private datePipe: DatePipe) {
    
  }

  ngOnInit() {
    this.user = this.authService.getUserFromLocalCache()
    this.username = this.user.username
    this.password = this.user.password
    let today = new Date();
    this.questionForm = this.fb.group({
      password: this.password,
      username: this.username,
      title: ['', Validators.required],
      content: ['', Validators.required],
    })
  }

  submitQuestion() {
    console.log(this.questionForm.value)
    this.questionService.addQuestion(this.questionForm.value).subscribe(data => {
      Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then(result=>{
        this.router.navigate([''])
        // window.location.reload()
      })
    })

  }

}
