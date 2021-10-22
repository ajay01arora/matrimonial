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

//const apiUrl = "https://lootersisland.com/Matrimonial/Api/public/";

const apiUrl = "http://gurjarvivah.com/Api/public/";


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

  async deleteAdmin(adminId : number) {
    return await this.http.delete<any>(apiUrl+"admin/"+adminId).toPromise();
  }
 
 async  editCandidate(value: any, filedata: any) 
 {
    var user = localStorage.getItem('currentUser');
    if(user != null)
    {
        value.adminId = JSON.parse(user).data?.adminId;    
        const data = await this.http.put<any>(apiUrl+"candidate/"+value.id, value, httpOptions).toPromise();
        return data;
    }
  }


  async registerCandidate(value: any, filedata: any) {

    var user = localStorage.getItem('currentUser');
    if(user != null)
    {
        value.adminId = JSON.parse(user).data?.adminId;            
    }
    return await this.http.post<any>(apiUrl+"candidate", value, httpOptions).toPromise();
  }

  async contactSuperAdmin(value: any) {
    const data = await this.http.post<any>(apiUrl+"contact", value, httpOptions).toPromise();
    return data;
  }
    
  async registerAdmin(value: any) {
    value.approved = false;    
    const data = await this.http.post<any>(apiUrl+"admin", value, httpOptions).toPromise();
    
    if (data.loginSuccess) 
    {
      if(data.data.approved == 1)
      {
        localStorage.setItem('currentUser', JSON.stringify(data.admin));
        localStorage.setItem('isLoggedIn', "true");
        this.currentUserSubject?.next(data.admin);
      }
      else 
      {
        alert("Your account is not approved yet. Please contact to the super admin via call or contact page."); 
      }
    }
     return data;
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

      if(data.data.approved == 1)
      {
        alert("Login successfully");
        localStorage.setItem('currentUser', JSON.stringify(data));
        localStorage.setItem('isLoggedIn', "true");
        this.currentUserSubject?.next(data);
      }
      else 
      {
        alert("Your account is not approved yet. Please contact to the super admin via call or contact page."); 
      }
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

  GetAdminListForSuperAdmin(pageNumber: number){
    return this.http.get(apiUrl+"admin/list/1/"+pageNumber);
  }
  

  GetContactList(pageNumber: number){
    return this.http.get(apiUrl+"contact?pageNumber="+pageNumber);
  }

  GetCandidateList(pageNumber: number) {
    return this.http.get(apiUrl+"candidate?pageNumber="+pageNumber);
  }

  GetCandidateListByAdminId(pageNumber: number) {

    var user = localStorage.getItem('currentUser');
    if(user != null)
    {
        var adminId = JSON.parse(user).data.adminId;   
    }
    return this.http.get(apiUrl+"candidate/list/"+adminId+"/"+pageNumber);  
  }

  GetCandidatesByAdminId(adminId : number, pageNumber: number) {
    return this.http.get(apiUrl+"candidate/list/"+adminId+"/"+pageNumber);  
  }

  GetCandidateListByGender(gender :string, pageNumber: number) {
    return this.http.get(apiUrl+"candidate/"+gender+"/"+pageNumber);
  }

  async GetCandidateById(customerId: any){
    return await this.http.get<any>(apiUrl+"candidate/"+customerId).toPromise();
  }

  async GetAdminProfile(adminId: number){
    return await this.http.get<any>(apiUrl+"admin/"+adminId).toPromise();
  }

  async ApproveorReject(adminId : number, approval : boolean) {
    return await this.http.get<any>(apiUrl+"admin/approval/"+adminId+"/"+approval).toPromise();
  }

  GetCandidateListThroughFilter(filterData: { education: string; height: string; age: string; }) {
    return this.http.post(apiUrl+"candidate/filter", filterData);
  }

  async updateQuery(id: any) {
    return await this.http.get<any>(apiUrl+"contact/read/"+id).toPromise();
  }

  
}
