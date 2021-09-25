import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public fb : FormBuilder, private router : Router, private backendService : BackendService, private sanitizer:DomSanitizer) { }

  registerForm!: FormGroup;
  saveButton : string = "Register";
  submitted:Boolean=false;
  filedata : any;
  imgPath : string = "";

  async ngOnInit(){

    this.registerForm = this.fb.group({
      name : ["", [Validators.required]],
      place : ["", [Validators.required]],
      userId : ["", [Validators.required, Validators.minLength(8)]],
      password : ["", [Validators.required, Validators.minLength(8)]],
      phone : ["", [Validators.required, Validators.minLength(10)]]
    });
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
}

  async onFileChange(event : any) {  
    if (event.target.files.length > 0) {
      this.filedata = event.target.files[0];
      const data = await this.backendService.uploadImage(this.filedata);

      if(data.status == 200)
      {
          this.registerForm.value.img = data.imgPath;
          this.imgPath = data.imgPath;
      }
    }
  }

  get f() {
    return this.registerForm.controls;
  } 

  async register() 
  {
    this.saveButton = "Registering";
    this.submitted=true;
    
    if (this.registerForm.invalid) {
      return;
     }

    if (this.registerForm.valid && this.imgPath != "")
    {
      this.registerForm.value.img = this.imgPath;
      const data=  await this.backendService.registerAdmin(this.registerForm.value, this.filedata)
        if(data){          
            this.router.navigate(['/home'])
          }
    }      
  }
}
