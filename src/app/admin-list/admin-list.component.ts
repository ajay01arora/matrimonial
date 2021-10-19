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
  currentUser:any;
  isSuperAdmin : boolean = false;

  ngOnInit(): void {

    this.backendService.currentUser?.subscribe(x => 
      {
        if(x?.role == "super-admin")
        {
          this.isSuperAdmin = true;
        }
      }
    );
    if(this.isSuperAdmin)
    {
      this.backendService.GetAdminListForSuperAdmin(this.pageNumber).subscribe((data : any) => {
        this.AdminList = data;
      });
    }
    else
    {
      this.backendService.GetAdminList(this.pageNumber).subscribe((data : any) => {
        this.AdminList = data;
      });
    }
  }

  async Remove(event: any)
  {
    if(confirm("Are you sure you want to delete candidate?"))
    {
       await this.backendService.deleteCandidate(event.target.id);
       this.AdminList.forEach((value,index)=>{
        if(value.adminId==event.target.id) this.AdminList.splice(index,1);
    });
    }
  }

  get IsDataAvailable()
  {
    return this.AdminList?.length != 0;
  }

  async approveOrReject(event : any)
  {
    var approval = false;
    if(event.target.innerText == "Approve")
    {
        approval =  true;
    }
    
    const response = await this.backendService.ApproveorReject(event.target.id, approval);
    if(response.status == 200)
    {
      this.AdminList.forEach(a => {
        if(a.adminId == event.target.id)
        {
          a.approved = approval;
        }
      });

    }
  }

  MoreDeal(direction : string)
  {
    if(direction === 'next')
    {
      window.scroll(0,0)
      if(this.isSuperAdmin)
      {
        this.backendService.GetAdminListForSuperAdmin(++this.pageNumber).subscribe((data : any) => {
          this.AdminList = data;
        });
      }
      else
      {
        this.backendService.GetAdminList(this.pageNumber).subscribe((data : any) => {
          this.AdminList = data;
        });
      }
    }else if(direction === 'previous')
    {
      window.scroll(0,0)
      if(this.isSuperAdmin)
      {
        this.backendService.GetAdminListForSuperAdmin(--this.pageNumber).subscribe((data : any) => {
          this.AdminList = data;
        });
      }
      else
      {
        this.backendService.GetAdminList(--this.pageNumber).subscribe((data : any) => {
          this.AdminList = data;
        });
      }
    }
  }

}
