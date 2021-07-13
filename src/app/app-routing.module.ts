import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToEmployeeList = () => redirectLoggedInTo(['employee-list']);

const routes: Routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},
  {path:'login',component:SignInComponent,
  data: { authGuardPipe: redirectLoggedInToEmployeeList}
},

  {path:'signup',component:SignUpComponent},

  {path:'employee-list',component:EmployeeListComponent,
  canActivate: [AngularFireAuthGuard],
  data: { authGuardPipe: redirectUnauthorizedToLogin }
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],

  exports: [RouterModule]
})
export class AppRoutingModule { }
