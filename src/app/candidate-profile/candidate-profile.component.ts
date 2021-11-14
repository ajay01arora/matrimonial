import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {

  
  constructor(private activatedRoute : ActivatedRoute, private backendService : BackendService) { }

candidate : any;

  async ngOnInit(){

    const candidateId = this.activatedRoute.snapshot?.params?.id;
        
    if(candidateId)
    {
      this.candidate = await this.backendService.GetCandidateById(candidateId);      

    }
  }
}
