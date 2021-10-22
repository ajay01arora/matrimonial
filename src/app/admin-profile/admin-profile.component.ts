import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
   
  adminId : any;
  Admin : any;
  CandidateList : any;
  pageNumber = 1;

  constructor(private activatedRoute : ActivatedRoute, private backendService : BackendService) { }

  async ngOnInit() {
    this.adminId = this.activatedRoute.snapshot?.url[1]?.path;
    const data =  await this.backendService.GetAdminProfile(this.adminId);    
    this.Admin = data[0];

    this.backendService.GetCandidatesByAdminId(this.adminId, this.pageNumber).subscribe((data : any) => {
      this.CandidateList = data;
    });
  }

}
