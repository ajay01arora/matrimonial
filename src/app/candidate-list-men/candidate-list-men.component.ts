import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidate-list-men',
  templateUrl: './candidate-list-men.component.html',
  styleUrls: ['./candidate-list-men.component.css']
})
export class CandidateListMenComponent implements OnInit {

  
  constructor(private activatedRoute : ActivatedRoute,private backendService : BackendService) { }

  CandidateList: Array<any> =[];
  pageNumber = 1;
  gender : string = "";

  ngOnInit(): void {
    
    this.gender = this.activatedRoute.snapshot?.url[1]?.path;
    this.backendService.GetCandidateListByGender(this.gender, this.pageNumber).subscribe((data : any) => {
      this.CandidateList = data;
    });
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

  ClearFilter()
  {
    this.filterData = { education : "", height : "", age : "", gender : this.gender}
    this.backendService.GetCandidateListByGender(this.gender, this.pageNumber).subscribe((data : any) => {
      this.CandidateList = data;
    });
  }

  MoreDeal(direction : string)
  {
    if(direction === 'next')
    {
      window.scroll(0,0)
      this.backendService.GetCandidateListByGender(this.gender, ++this.pageNumber).subscribe((data : any)=>
      {
        this.CandidateList = data
      });

    }else if(direction === 'previous')
    {
      window.scroll(0,0)
      this.backendService.GetCandidateListByGender(this.gender, --this.pageNumber).subscribe((data : any)=>
      {        
        this.CandidateList = data 
      }) 
    }
  }

  filterData = { education : "", height : "", age : "", gender : this.gender}

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

  filteredData(e : any) 
  {
    if(e.target.name == "education")
    {
    this.filterData.education = e.target.value;
    }
    else if(e.target.name == "height")
    {
      this.filterData.height = e.target.value;
    }
    else if(e.target.name == "age")
    {
      this.filterData.age = e.target.value;
    }
    this.filterData.gender = this.gender;
    this.backendService.GetCandidateListThroughFilter(this.filterData).subscribe((data : any)=>
    {        
      this.CandidateList = data 
    }) 
  }
}