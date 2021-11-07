import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-queries',
  templateUrl: './contact-queries.component.html',
  styleUrls: ['./contact-queries.component.css']
})
export class ContactQueriesComponent implements OnInit {

  constructor(public fb : FormBuilder, private router : Router, private backendService : BackendService, private toastr:ToastrService) { }

  contactForm!: FormGroup;
  contactList : Array<any>;
  pageNumber = 1;
  IsSelected : boolean = false;

  ngOnInit(): void {

    this.backendService.GetContactList(this.pageNumber).subscribe((data : any) => {
      this.contactList = data;
    });

    this.contactForm = this.fb.group({
      name : ["", [Validators.required]],
      email : ["", [Validators.required]],
      message : ["", [Validators.required, Validators.minLength(5)]],
      phone : ["", [Validators.required, Validators.minLength(10)]]
    });
  }

  async selectedQuery(query : any)
  {
    if(query.isRead == 0)
    {
        const response = await this.backendService.updateQuery(query.id);
        if(response.status == 200)
        {
          this.contactList.forEach(a => {
            if(a.id == query.id)
            {
              a.isRead = 1;
            }
          });
        }
    }

    this.IsSelected = true;
    this.contactForm = this.fb.group({
      name : [query.name, [Validators.required]],
      email : [query.email, [Validators.required]],
      message : [query.message, [Validators.required, Validators.minLength(5)]],
      phone : [query.phone, [Validators.required, Validators.minLength(10)]]
    });
  }

  async Remove(event: any)
  {
    if(confirm("Are you sure you want to delete query?"))
    {
       this.IsSelected = false;
       await this.backendService.deleteQuery(event.target.id);
       this.contactList.forEach((value,index)=>{
        if(value.id==event.target.id) this.contactList.splice(index,1);
    });
    }
  }

  get f() {
    return this.contactForm.controls;
  } 

}
