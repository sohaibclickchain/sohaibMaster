import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isSignedIn:boolean=false
  error: any;
  constructor(private firebaseService:FirebaseService,private router:Router,private notification:NotificationService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')!==null){
      this.isSignedIn=true
    }
    else{
      this.isSignedIn=false
    }
  }
  async onSignIn(email:string,password:string){
    await this.firebaseService.signIn(email,password)
    .then(res => {
      if (localStorage.user) {
        this.router.navigate(['/employee-list']);
      }
    })
    .catch(err => {
      console.log(`login failed ${err}`);
      if(err){
        this.error = err.message;
        this.notification.warn(this.error)
      }
      else{
        this.notification.success('Successfully Loggin !!')
      }
    });

    if(this.firebaseService.isLoggedIn){
      this.isSignedIn=true

    }
  }


}
