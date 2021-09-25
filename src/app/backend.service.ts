import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { IAdmin } from './interfaces/admin';
import {  BehaviorSubject,  Observable } from 'rxjs';

const httpOptions =  {
  headers: new HttpHeaders(
    {
      'Content-Type' : 'application/json',
      "Access-Control-Allow-Origin":"*"    
    })
};

//const apiUrl = "http://localhost:8090/Angular%20Matrimonial/Api%20Matrimonial/api/public/";

const apiUrl = "https://lootersisland.com/Matrimonial/Api/public/";


@Injectable({
  providedIn: 'root'
})

export class BackendService {


  private currentUserSubject: BehaviorSubject<any>;
  public currentUser : Observable<any> ;
   
  constructor(private http: HttpClient) {
    var user = localStorage.getItem('currentUser');
    if(user != null)
    {
      this.currentUserSubject = new BehaviorSubject <any> (JSON.parse(user));
      this.currentUser = this.currentUserSubject.asObservable();
    }
   
  }

  async deleteCandidate(customerId : number) {
    return await this.http.delete<any>(apiUrl+"candidate/"+customerId).toPromise();
  }
 
 async  editCandidate(value: any, filedata: any) 
 {
  var user = localStorage.getItem('currentUser');
    if(user != null)
    {
        value.adminId = JSON.parse(user).adminId;    
        const data = await this.http.put<any>(apiUrl+"candidate/"+value.id, value, httpOptions).toPromise();
        
        //this.uploadImage(filedata);
        return data;
    }
  }


  async registerCandidate(value: any, filedata: any) {
    value.adminId = 1; //JSON.parse(localStorage.getItem('currentUser'));    
    const data = await this.http.post<any>(apiUrl+"candidate", value, httpOptions).toPromise();
    return data;
  }
    
  async registerAdmin(value: IAdmin, filedata: any) {
    value.approved = false;    
    const data = await this.http.post<any>(apiUrl+"admin", value, httpOptions).toPromise();
    this.uploadImage(filedata);
    
    if (data.loginSuccess) {
      localStorage.setItem('currentUser', JSON.stringify(data.admin));
      localStorage.setItem('isLoggedIn', "true");
      this.currentUserSubject?.next(data.admin);
     }
     return data.loginSuccess;
  }

  async uploadImage(filedata : any)
  {
    var myFormData = new FormData();
     const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      myFormData.append('image', filedata);     

      /* Image Post Request */
      const data = await this.http.post<any>(apiUrl+"admin/image", myFormData, {headers: headers}).toPromise();
      console.log("imgData: "+data)
      return data;

  }

  async login(username: string, password: string)
  {
    
    const data = await this.http.get<any>(apiUrl+"admin/login?username="+username+"&password="+password).toPromise();
    console.log("login "+data);

    if (data.loginSuccess) {
      localStorage.setItem('currentUser', JSON.stringify(data.admin));
      localStorage.setItem('isLoggedIn', "true");
      this.currentUserSubject?.next(data.admin);
     }

     return data;
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject?.next(null);
  
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
   }

   GetAdminList(pageNumber: number){
    return this.http.get(apiUrl+"admin?pageNumber="+pageNumber);
  }

  GetCandidateList(pageNumber: number) {
    return this.http.get(apiUrl+"candidate?pageNumber="+pageNumber);
  }

  async GetCandidateById(customerId: any){
    return await this.http.get<any>(apiUrl+"candidate/"+customerId).toPromise();
  }
  
}
