import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isSignedIn:boolean=false
  error: any="Having Error"
  constructor(private firebaseService:FirebaseService,private router:Router,private notification:NotificationService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')!==null){
      this.isSignedIn=true
    }
    else{
      this.isSignedIn=false
    }
  }
  async onSignUp(email:string,password:string){
    await this.firebaseService.signUp(email,password)
    .then(res => {
      if (localStorage.user) {
        console.log(localStorage.user);
        this.router.navigate(['/employee-list']);
      }
    })
    .catch(err => {
      console.log(`cannot log In ${err}`);
      if(err){
        this.error = err.message;
        this.notification.warn(this.error)
      }
      else{
        this.notification.success('Successfully Registered !!')
      }
    });
    if(this.firebaseService.isLoggedIn){
      this.isSignedIn=true
    }
  }


}
