import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public fb : FormBuilder, private router : Router, private backendService : BackendService, private toastr:ToastrService) { }

  contactForm!: FormGroup;
  saveButton : string = "Contact Us";
  submitted:Boolean=false;

  ngOnInit(): void {

    this.contactForm = this.fb.group({
      name : ["", [Validators.required]],
      email : ["", [Validators.required]],
      message : ["", [Validators.required, Validators.minLength(5)]],
      phone : ["", [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.contactForm.controls;
  } 

  async contact() 
  {
    this.saveButton = "Contact";
    this.submitted=true;
    
    if (this.contactForm.invalid) {
      return;
     }

    if (this.contactForm.valid)
    {
      const data=  await this.backendService.contactSuperAdmin(this.contactForm.value)
      alert(data.message);
     
    }      
  }

}
