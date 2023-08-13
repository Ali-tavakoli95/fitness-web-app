import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegistrationComponent } from './components/create-registration/create-registration.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { RegistrationListComponent } from './components/registration-list/registration-list.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: CreateRegistrationComponent },
  { path: 'update/:id', component: CreateRegistrationComponent },
  { path: 'detail/:id', component: UserDetailComponent },
  { path: 'list', component: RegistrationListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
