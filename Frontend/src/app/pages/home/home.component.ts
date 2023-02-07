import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Question } from 'src/app/interfaces/question';
import Swal from 'sweetalert2';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  questions : Question[] = [] 
  numberOfQuestions = 0
  user: any
  username: string | undefined

  constructor(private router: Router, 
              private formBuilder: FormBuilder, 
              private authService: AuthService) {}
              
  ngOnInit(): void {
    this.authService.getQuestions().subscribe(data => {
      this.questions = data;
      console.log(data)
    })
    for(var obj in this.questions)
    {
      this.numberOfQuestions++;
      
    }
    this.user = this.authService.getUserFromLocalCache()
    this.username = this.user.username

  }

  goToPage(questionID : number): void {
    this.router.navigate(["/question/" + String(questionID)])
  }
}
