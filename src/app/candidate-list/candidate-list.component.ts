import { Component } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent 
{ 
  constructor(private backendService : BackendService) { }

  CandidateList!: Array<any>;
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
      this.backendService.GetCandidateList(this.pageNumber).subscribe((data : any) => {
        this.CandidateList = data;
      });
    }
    else
    {
      this.backendService.GetCandidateListByAdminId(this.pageNumber).subscribe((data : any) => {
        this.CandidateList = data;
      });
    }
  }
  get IsDataAvailable()
  {
    return this.CandidateList?.length != 0;
  }

  async Remove(event: any)
  {
    if(confirm("Are you sure you want to delete candidate?"))
    {
       await this.backendService.deleteCandidate(event.target.id);
       this.CandidateList.forEach((value,index)=>{
        if(value.id==event.target.id) this.CandidateList.splice(index,1);
    });
    }
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
    const response = await this.backendService.ApproveorRejectBySuperAdmin(event.target.id, approval);
    if(response.status == 200)
    {
      this.CandidateList.forEach(a => {
        if(a.id == event.target.id)
        {
          a.superadminid = approval;
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
        this.backendService.GetCandidateList(++this.pageNumber).subscribe((data : any)=>
        {
          this.CandidateList = data
        });
      }
      else
      {
        this.backendService.GetCandidateListByAdminId(++this.pageNumber).subscribe((data : any)=>
        {
          this.CandidateList = data
        });
      }

    }else if(direction === 'previous')
    {
      window.scroll(0,0)
      if(this.isSuperAdmin)
      {
        this.backendService.GetCandidateList(--this.pageNumber).subscribe((data : any)=>
        {
          this.CandidateList = data
        });
      }
      else
      {
        this.backendService.GetCandidateListByAdminId(--this.pageNumber).subscribe((data : any)=>
        {
          this.CandidateList = data
        });
      }
    }
  }
}