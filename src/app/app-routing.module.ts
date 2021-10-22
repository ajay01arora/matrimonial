import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { CandidateListMenComponent } from './candidate-list-men/candidate-list-men.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { ContactQueriesComponent } from './contact-queries/contact-queries.component';
import { ContactComponent } from './contact/contact.component';
import {HomeComponent} from './home/home.component'
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './register/register.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "home", component: HomeComponent},
  {path:"about",component:AboutComponent},
  { path: "register", component: RegisterComponent },
  { path: "contact", component: ContactComponent },
  { path: "pages", component: PagesComponent },
  { path: "candidate-list", component: CandidateListComponent },
  { path: "admin-list", component: AdminListComponent },
  { path: "admin-profile/:id", component: AdminProfileComponent },
  { path: "contact-queries", component: ContactQueriesComponent },
  { path: "services", component: ServicesComponent },
  { path: "candidate-form", component: CandidateFormComponent, canActivate: [AuthGuardGuard]},
  { path: "candidate-list/male", component: CandidateListMenComponent},
  { path: "candidate-list/female", component: CandidateListMenComponent },
  { path: "candidate-list/edit/:id", component: CandidateFormComponent, canActivate: [AuthGuardGuard] },
  { path: "candidate-list/details/:id", component: CandidateFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
