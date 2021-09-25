import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './home/home.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { ServicesComponent } from './services/services.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { CandidateListMenComponent } from './candidate-list-men/candidate-list-men.component';
import { AgePipe } from './pipe/age.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    RegisterComponent,
    PagesComponent,
    HomeComponent,
    CandidateListComponent,
    HeaderComponent,
    FooterComponent,
    AdminListComponent,
    ServicesComponent,
    CandidateFormComponent,
    CandidateListMenComponent,
    AgePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule,
    HttpClientModule,
    FormsModule,    
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
