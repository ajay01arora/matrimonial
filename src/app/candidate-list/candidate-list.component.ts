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

  ngOnInit(): void {
    this.backendService.GetCandidateList(this.pageNumber).subscribe((data : any) => {
      this.CandidateList = data;
    });
  }
  get IsDataAvailable()
  {
    return this.CandidateList.length != 0;
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

  MoreDeal(direction : string)
  {
    if(direction === 'next')
    {
      window.scroll(0,0)
      this.backendService.GetCandidateList(++this.pageNumber).subscribe((data : any)=>
      {
        this.CandidateList = data
      });

    }else if(direction === 'previous')
    {
      window.scroll(0,0)
      this.backendService.GetCandidateList(--this.pageNumber).subscribe((data : any)=>
      {        
        this.CandidateList = data 
      }) 
    }
  }
}