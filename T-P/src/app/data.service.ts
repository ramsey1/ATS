import { Injectable, EventEmitter } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  logout:boolean;

  invokeFirstComponentFunction = new EventEmitter();    
  subsVar: Subscription;   

  interviewerURL = 'http://localhost:3000/api/interviewer';
  jobsURL = 'http://localhost:3000/api/jobs';
  applicantURL = 'http://localhost:3000/api/applicant';
  loginURL = 'http://localhost:3000/api/login';
  tbaURL = 'http://localhost:3000/api/to_be_assigned';
  assignedURL = 'http://localhost:3000/api/assigned';
  registerURL = 'http://localhost:3000/api/register';

  constructor(private http: HttpClient) { }

  setServerRegister(user):Observable<any>{
    return this.http.post<any>(this.registerURL,user);
  }

  getServerInterviewer() :Observable<any>{
    return this.http.get<any>(this.interviewerURL);
  }

  setServerInterviewer(interviewer): Observable<any>{
    return this.http.post<any>(this.interviewerURL,interviewer);
  }

  serverInterviewer(){
    return new Promise((resolve,reject)=>{
      this.getServerInterviewer().subscribe(res=>{
        resolve(res);
      })
    })
  }

  async getInterviewer() {
    let interviewer = await this.serverInterviewer();
    return interviewer;
  }

  
  getServerJobs() :Observable<any>{
    return this.http.get<any>(this.jobsURL);
  }

  setServerJobs(jobs): Observable<any>{
    return this.http.post<any>(this.jobsURL,jobs);
  }

  getSevrerApplicant(): Observable<any>{
    return this.http.get<any>(this.applicantURL);
  }

  getOneApplicant(user): Observable<any>{
    return this.http.post<any>(this.applicantURL+'/'+user.email,user);
  }

  setServerApplicant(applicant): Observable<any>{
    return this.http.post<any>(this.applicantURL,applicant);
  }

  serverApplicant(){
    return new Promise((resolve,reject)=>{
      this.getSevrerApplicant().subscribe(res=>{
        resolve(res);
      })
    });
  }

  async getApplicant(){
    let applicant = await this.serverApplicant();
    return applicant;
  }

  getServerTBA():Observable<any>{
    return this.http.get(this.tbaURL);
  }

  setServerTBA(tba): Observable<any>{
   return this.http.post<any>(this.tbaURL, tba);
  }

  updateServerTBA(tba):Observable<any>{
    return this.http.put<any>(this.tbaURL+'/'+tba.c_email,tba);
  }

  serverTBA(){
    return new Promise((resolve,reject)=>{
      this.getServerTBA().subscribe(res=>{
        resolve(res);
      })
    })
  }

  async getTBA(){
    let tba = await this.serverTBA();
    return tba;
  }

  getServerAssigned(): Observable<any>{
    return this.http.get<any>(this.assignedURL);
  }

  getOneAssigned(user):Observable<any>{
    return this.http.post<any>(this.assignedURL+'/'+user.email,user);
  }

  setServerAssigned(assigned): Observable<any>{
    return this.http.post<any>(this.assignedURL,assigned);
  }

  updateServerAssigned(assigned): Observable<any>{
    return this.http.put<any>(this.assignedURL+'/'+assigned._id,assigned);
  }

  serverAssigned(){
    return new Promise((resolve,reject)=>{
      this.getServerAssigned().subscribe(res=>{
        resolve(res);
      })
    });
  }

  async getAssigned(){
    let assigned = await this.serverAssigned() 
    return assigned;
   }


  onFirstComponentButtonClick() {    
    this.invokeFirstComponentFunction.emit();    
  }

  login(data):Observable<any>{
    return this.http.post<any>(this.loginURL,data);
  }

  
  setLogin(log){
    this.logout = log;
  }

  getLogin(){
    return this.logout;
  }
}
