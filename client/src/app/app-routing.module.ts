import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { NotFoundComponent } from './component/not-found/not-found.component';


const routes: Routes = [
  {
    path: '', 
    component: HomeComponent
  },
  {
    path: 'home', 
    component: HomeComponent
  },
  {
    path: 'sign-in', 
    component: SignInComponent
  },
  {
    path: 'sign-up', 
    component: SignUpComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
