import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from 'src/app/services/answer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  questionID : any
  question : any
  answerForm!: FormGroup;
  user: any
  username!: string;
  password!: string;

  answers: any
  users: any

  constructor(private router: Router,
    private activatedRoute : ActivatedRoute,
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private fb: FormBuilder,
    private answerService: AnswerService) {}

  ngOnInit(): void {  
    this.questionID = this.activatedRoute.snapshot.params['id'];

    this.authService.getQuestionById(Number(this.questionID)).subscribe(data => {
      this.question = data;

      console.log(data)
    })

    // this.authService.getUserById(this.question.userID).subscribe(data => {
    //   this.user = data;
    //   console.log(data)
    // })

    this.user = this.authService.getUserFromLocalCache()
    this.username = this.user.username
    this.password = this.user.password
    this.answerForm = this.fb.group({
      username: this.username,
      password: this.password,
      questionID: this.questionID,
      content: ['', Validators.required]
    })

    this.answerService.getAnswers().subscribe(data => {
      this.answers = data;
      console.log(data)
    })
  }

  submitAnswer() {
    console.log(this.answerForm.value)
    this.answerService.addAnswer(this.answerForm.value).subscribe(data => {
      Swal.fire('Thank you...', 'You submitted succesfully!', 'success').then(result=>{
        this.router.navigate(['/question/' + String(this.questionID)])
        // window.location.reload()
      })
    })
  }

  findUser(answerID :  Number) {
    this.authService.getUserById(answerID).subscribe(data => {
      this.users = data;
      console.log(data)
    })
  }
}

