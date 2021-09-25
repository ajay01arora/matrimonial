import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private backendService : BackendService) { }
  
  show:boolean=false;
  currentUser:any;

  ngOnInit(): void {
    this.backendService.currentUser?.subscribe(x => 
           {
             console.log("Login User======",x)
             this.currentUser = x
           }
         );
   }
 
   logout(){
     this.backendService.logout()
     this.router.navigate(['/home'])
   }

username : string = "";
password : string = "";


async login(f : NgForm) {    

    if(this.username == "" || this.password == "")
    return;

    const loginData = await this.backendService.login(this.username, this.password);

    if (loginData) {
        console.log("data====", loginData)
        this.router.navigate(['/home']);
    } else {
        //this.message = "Please check your userid and password";
    }
}


}
