import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { IAdmin } from '../interfaces/admin';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  constructor(private backendService : BackendService) { }

  AdminList: Array<IAdmin> =[];
  pageNumber = 1;

  ngOnInit(): void {

    this.backendService.GetAdminList(this.pageNumber).subscribe((data : any) => {
      this.AdminList = data;
    });

  }

  get IsDataAvailable()
  {
    return this.AdminList.length != 0;
  }

  MoreDeal(direction : string)
  {
    if(direction === 'next')
    {
      window.scroll(0,0)
      this.backendService.GetCandidateList(++this.pageNumber).subscribe((data : any)=>
      {
        this.AdminList = data
      });

    }else if(direction === 'previous')
    {
      window.scroll(0,0)
      this.backendService.GetCandidateList(--this.pageNumber).subscribe((data : any)=>
      {        
        this.AdminList = data 
      }) 
    }
  }

}
