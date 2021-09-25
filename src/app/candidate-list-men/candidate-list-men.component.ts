import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-candidate-list-men',
  templateUrl: './candidate-list-men.component.html',
  styleUrls: ['./candidate-list-men.component.css']
})
export class CandidateListMenComponent implements OnInit {

  
  constructor(private backendService : BackendService) { }

  CandidateList: Array<any> =[];
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

  filterData = { education : "", height : "", age : ""}

  // filerPlace(e : any) 
  // {
  //   var index = this.filterData.places.indexOf(e.target.value);
  //   if(this.filterData.places[0] == "")
  //   {
  //     this.filterData.places[0] = e.target.value;
  //   }else if(index == -1)
  //   {
  //     this.filterData.places.push(e.target.value);
  //   }
  //   else
  //   {
  //     this.filterData.places.splice(index, 1);     
  //   }    
  //   console.log(e.target.value);
  // }

  filerHeight(e : any) 
  {
    this.filterData.height = e.target.value;
    console.log(e.target.value);
  }
  filerAge(e : any) 
  {
    this.filterData.age = e.target.value;
    console.log(e.target.value);
  }
  filerEduation(e : any) 
  {
    this.filterData.education = e.target.value;
    console.log(e.target.value);
  }
}