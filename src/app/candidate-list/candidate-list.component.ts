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

  NotApprovedCandidateList : Array<any>;
  ApprovedCandidateList : Array<any>;
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
        this.ApprovedCandidateList = data.approved;
        this.NotApprovedCandidateList = data.not_approved;
      });
    }
    else
    {
      this.backendService.GetCandidateListByAdminId(this.pageNumber).subscribe((data : any) => {
        this.ApprovedCandidateList = data.approved;
        this.NotApprovedCandidateList = data.not_approved;
      });
    }
  }
  get IsApprovedCandidate()
  {
    return this.ApprovedCandidateList?.length != 0;
  }

  get IsNotApprovedCandidate()
  {
    return this.NotApprovedCandidateList?.length != 0;
  }

  async Remove(event: any)
  {
    if(confirm("Are you sure you want to delete candidate?"))
    {

      var candidateId = event.target.id;
       await this.backendService.deleteCandidate(candidateId);
        this.RemoveCandidateById(candidateId);
    }
  }

  private RemoveCandidateById(candidateId: any) {
    this.NotApprovedCandidateList.forEach((value, index) => {
      if (value.id == candidateId)
        this.NotApprovedCandidateList.splice(index, 1);
    });
    this.ApprovedCandidateList.forEach((value, index) => {
      if (value.id == candidateId)
        this.ApprovedCandidateList.splice(index, 1);
    });
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

      if(event.target.innerText == "Approve")      
      {
        this.NotApprovedCandidateList.forEach(a => {
          if(a.id == event.target.id)
          {
            a.superadminId = approval;
            this.RemoveCandidateById(a.id);
            this.ApprovedCandidateList.push(a);
          }
        });
      }
      else
      {
        this.ApprovedCandidateList.forEach(a => {
          if(a.id == event.target.id)
          {
            a.superadminId = approval;
            this.RemoveCandidateById(a.id);
            this.NotApprovedCandidateList.push(a);
          }
        });
      }
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
          this.ApprovedCandidateList = data.approved;
          this.NotApprovedCandidateList = data.not_approved;
        });
      }
      else
      {
        this.backendService.GetCandidateListByAdminId(++this.pageNumber).subscribe((data : any)=>
        {
          this.ApprovedCandidateList = data.approved;
        this.NotApprovedCandidateList = data.not_approved;
        });
      }

    }else if(direction === 'previous')
    {
      window.scroll(0,0)
      if(this.isSuperAdmin)
      {
        this.backendService.GetCandidateList(--this.pageNumber).subscribe((data : any)=>
        {
          this.ApprovedCandidateList = data.approved;
        this.NotApprovedCandidateList = data.not_approved;
        });
      }
      else
      {
        this.backendService.GetCandidateListByAdminId(--this.pageNumber).subscribe((data : any)=>
        {
          this.ApprovedCandidateList = data.approved;
        this.NotApprovedCandidateList = data.not_approved;
        });
      }
    }
  }
}