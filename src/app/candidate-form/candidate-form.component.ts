import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']
})
export class CandidateFormComponent implements OnInit {
  

  constructor(public activatedRoute : ActivatedRoute, private fb : FormBuilder, private router : Router, private backendService : BackendService, private toaster : ToastrService) { }

  candidateForm!: FormGroup;
  saveButton : string = "Register";
  submitted:Boolean=false;
  filedata : any;
  candidate : any;
  pageName : string = "";
  isReadOnly : boolean =false;
  imgPath : string = "";
  tempImagePath: string;

  async ngOnInit(){

    const customerId = this.activatedRoute.snapshot?.params?.id;
    this.pageName = this.activatedRoute.snapshot?.url[1]?.path;
    
    if(customerId)
    {
      const data = await this.backendService.GetCandidateById(customerId);      

      this.candidateForm = this.fb.group({
        id : [data.id],
        name : [data.name, [Validators.required]],
        dob : [data.dob, [Validators.required]],
        gender : [data.gender, [Validators.required]],
        place : [data.place, [Validators.required]],
        height : [data.height, [Validators.required]],
        phone : [data.phone, [Validators.required]],
        hobby : [data.hobby],
        educational : [data.educational, [Validators.required]],
        educationalDetails : [data.educationalDetails, [Validators.required]],
        sourceOfIncome : [data.sourceOfIncome, [Validators.required]],
        incomeDetails : [data.incomeDetails, [Validators.required]],
        fatherDetails : [data.fatherDetails, [Validators.required]],
        motherDetails : [data.motherDetails, [Validators.required]],
        familyDetails : [data.familyDetails, [Validators.required]],
        currentAddress : [data.currentAddress, [Validators.required]],
      });

      if(this.pageName == "details")
      {
        this.isReadOnly = true;        
      }
      else if(this.pageName == "edit")
      {
        this.saveButton = "Update details";
      }
      this.imgPath = "http://gurjarvivah.com/Api/storage/app/public/images/"+data.img;
    }
    else
    {
        this.candidateForm = this.fb.group({
          name : ["", [Validators.required]],
          dob : ["", [Validators.required]],
          gender : ["", [Validators.required]],
          place : ["", [Validators.required]],
          height : ["", [Validators.required]],
          phone : ["", [Validators.required]],
          hobby : [""],
          educational : ["", [Validators.required]],
          educationalDetails : ["", [Validators.required]],
          sourceOfIncome : ["", [Validators.required]],
          incomeDetails : ["", [Validators.required]],
          fatherDetails : ["", [Validators.required]],
          motherDetails : ["", [Validators.required]],
          familyDetails : ["", [Validators.required]],
          currentAddress : ["", [Validators.required]],
        });
      }
  }

   changeGender(e : any) {
    console.log(e.target.value);
  }

  async onFileChange(event : any) {  
    if (event.target.files.length > 0) {
      this.filedata = event.target.files[0];
      const data = await this.backendService.uploadImage(this.filedata);

      if(data.status == 200)
      {
          this.tempImagePath = data.imgPath;
          this.imgPath = "http://gurjarvivah.com/Api/storage/app/public/images/"+data.imgPath;
      }
    }
  }

  get f() {
    return this.candidateForm.controls;
  } 

  async register() 
  {
    this.saveButton = "Registering";
    this.submitted=true;
    
    if (this.candidateForm.invalid) {
      return;
    }

    if (this.candidateForm.valid && this.imgPath != "")
    {
      this.candidateForm.value.img = this.tempImagePath;
      var data;
      if(this.pageName == "edit")
      {
         data=  await this.backendService.editCandidate(this.candidateForm.value)
      }else
      {
         data=  await this.backendService.registerCandidate(this.candidateForm.value)
         
      }
      if(data.status == 200)
      {     
        if(data.candidate.superadminId == 0)
        {
          this.toaster.info("Candidate is added and need to be approved from any super admin!");
        }
        this.router.navigate(['/candidate-list'])
      }else
      {
        this.toaster.error(data.message);
      }
    }
    else
    {
      this.toaster.error("Img is not uploaded yet. Please try again!")
    }
  }


 
}
