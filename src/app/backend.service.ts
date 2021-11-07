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

const apiUrl = "http://localhost:8090/Angular%20Matrimonial/Api%20Matrimonial/api/public/";

//const apiUrl = "https://lootersisland.com/Matrimonial/Api/public/";

//const apiUrl = "http://gurjarvivah.com/Api/public/";


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

  async deleteAdmin(id : number) {
    return await this.http.delete<any>(apiUrl+"admin/"+id).toPromise();
  }

  async deleteQuery(id: any) {
    return await this.http.delete<any>(apiUrl+"contact/"+id).toPromise();
  }
 
 async  editCandidate(value: any, filedata: any) 
 {
    var user = localStorage.getItem('currentUser');
    if(user != null)
    {
        value.id = JSON.parse(user).data?.id;    
        const data = await this.http.put<any>(apiUrl+"candidate/"+value.id, value, httpOptions).toPromise();
        return data;
    }
  }


  async registerCandidate(value: any, filedata: any) {

    var user = localStorage.getItem('currentUser');
    if(user != null)
    {
        value.id = JSON.parse(user).data?.id;            
    }
    return await this.http.post<any>(apiUrl+"candidate", value, httpOptions).toPromise();
  }

  async contactSuperAdmin(value: any) {
    const data = await this.http.post<any>(apiUrl+"contact", value, httpOptions).toPromise();
    return data;
  }
    
  async registerAdmin(value: any) {
    value.superadminId = false;    
    const data = await this.http.post<any>(apiUrl+"admin", value, httpOptions).toPromise();
    
    if (data.loginSuccess) 
    {
      if(data.data.superadminId != 0)
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

      if(data.data.superadminId != 0)
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

  GetSuperAdminList(){
    return this.http.get(apiUrl+"admin/superlist/");
  }
  

  GetContactList(pageNumber: number){
    return this.http.get(apiUrl+"contact?pageNumber="+pageNumber);
  }

  GetCandidateList(pageNumber: number) {
    return this.http.get(apiUrl+"candidate?pageNumber="+pageNumber);
  }

  GetCandidateListByAdminId(pageNumber: number) {

    var user = localStorage.getItem('currentUser');
    var id = 0;
    if(user != null)
    {
        id = JSON.parse(user).data.id;   
    }
    return this.GetCandidatesByAdminId(id, pageNumber);  
  }

  GetCandidatesByAdminId(id : number, pageNumber: number) {
    return this.http.get(apiUrl+"candidate/list/"+id+"/"+pageNumber);  
  }

  GetCandidateListByGender(gender :string, pageNumber: number) {
    return this.http.get(apiUrl+"candidate/"+gender+"/"+pageNumber);
  }

  async GetCandidateById(customerId: any){
    return await this.http.get<any>(apiUrl+"candidate/"+customerId).toPromise();
  }

  async GetAdminProfile(id: number){
    return await this.http.get<any>(apiUrl+"admin/"+id).toPromise();
  }

  async ApproveorReject(id : number, approval : number) {
    return await this.http.get<any>(apiUrl+"admin/approval/"+id+"/"+approval).toPromise();
  }
  async ApproveorRejectBySuperAdmin(candidateId : number, approval : number) {
    return await this.http.get<any>(apiUrl+"candidate/approval/"+candidateId+"/"+approval).toPromise();
  }

  GetCandidateListThroughFilter(filterData: { education: string; height: string; age: string; }) {
    return this.http.post(apiUrl+"candidate/filter", filterData);
  }

  async updateQuery(id: any) {
    return await this.http.get<any>(apiUrl+"contact/read/"+id).toPromise();
  }

  
}
