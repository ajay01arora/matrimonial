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

  AdminList: Array<any> =[];
  pageNumber = 1;
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
        this.AdminList = Object.keys(data).map(index => {
          let admin = data[index];
          return admin;
      });  
      });
    }
    else
    {
      this.backendService.GetAdminList(this.pageNumber).subscribe((data :any) => {        
           this.AdminList = Object.keys(data).map(index => {
          let admin = data[index];
          return admin;
      });  
            
      });
    }
  }

  async Remove(event: any)
  {
    if(confirm("Are you sure you want to delete admin?"))
    {
       await this.backendService.deleteAdmin(event.target.id);
       this.AdminList.forEach((value,index)=>{
        if(value.id==event.target.id) this.AdminList.splice(index,1);
    });
    }
  }

  get IsDataAvailable()
  {
    return this.AdminList?.length != 0;
  }

  async approveOrReject(event : any)
  {
    var approval = 0;
    if(event.target.innerText == "Approve")
    {
      this.backendService.currentUser?.subscribe(x => 
        {
          approval =  x.data.id;
        }
      );        
    }    
    const response = await this.backendService.ApproveorReject(event.target.id, approval);
    if(response.status == 200)
    {
      this.AdminList.forEach(a => {
        if(a.id == event.target.id)
        {
          a.superadminId = approval;
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
          this.AdminList = Object.keys(data).map(index => {
            let admin = data[index];
            return admin;
        });  
        });
      }
      else
      {
        this.backendService.GetAdminList(++this.pageNumber).subscribe((data : any) => {
          this.AdminList = Object.keys(data).map(index => {
            let admin = data[index];
            return admin;
        });  
        });
      }
    }else if(direction === 'previous')
    {
      window.scroll(0,0)
      if(this.isSuperAdmin)
      {
        this.backendService.GetAdminListForSuperAdmin(--this.pageNumber).subscribe((data : any) => {
          this.AdminList = Object.keys(data).map(index => {
            let admin = data[index];
            return admin;
        });  
        });
      }
      else
      {
        this.backendService.GetAdminList(--this.pageNumber).subscribe((data : any) => {
          this.AdminList = Object.keys(data).map(index => {
            let admin = data[index];
            return admin;
        });  
        });
      }
    }
  }

}
