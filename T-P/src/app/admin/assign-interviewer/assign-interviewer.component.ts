import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { CandidateDetailsComponent } from '../candidate-details/candidate-details.component';
import { Router } from '@angular/router';
import { slots } from '../slots';

@Component({
  selector: 'app-assign-interviewer',
  templateUrl: './assign-interviewer.component.html',
  styleUrls: ['./assign-interviewer.component.css']
})
export class AssignInterviewerComponent implements OnInit {

  constructor(private globalService : DataService,private router:Router) { 
    
    this.initializeForm();
  }

  tba : any;
  applicants :any;
  displayAssign : boolean;
  candidates=[];
  interviewers:any;
  j_id:any;
  next:any;
  jobCode:any;
  updateTBA:any;
  jobs:any;

  mockData={"name":"","email":""};

  tb:{
    job_code: "string"
  };

  TBA =[];

  interviewSlots = slots;

  name =[];

  date = "2019-03-01";
  time = "11:00-12:00 PM";
  mocEm = "vineet@gmail.com";
  

  assignInterviewer:FormGroup;

  ngOnInit() {
    this.getTBA();
    this.getInterviewer();
    this.getApplicant();
    }

  getApplicant(){
    this.globalService.getSevrerApplicant().subscribe(res=>{
      this.applicants = res;
    });
  }

  getInterviewer(){
    this.globalService.getServerInterviewer().subscribe(res=>{
      this.interviewers = res;
    });
  }

  getTBA(){
    this.globalService.getServerTBA().subscribe(res=>{
      this.tba = res;
      this.uniqueTBA();
    })
  }

  

  initializeForm(){
    this.assignInterviewer = new FormGroup({
      interviewerName:new FormControl(''),
      candidateEmail:new FormControl('',[Validators.required]),
      candidateName:new FormControl(''),
      interviewerEmail:new FormControl('',[Validators.required]),
      date:new FormControl('',[Validators.required]),
      time:new FormControl('',[Validators.required]),
      feedback:new FormControl(''),
      status:new FormControl(''),
      i_id:new FormControl(''),
      c_id:new FormControl(''),
      j_id:new FormControl(''),
      j_code:new FormControl(''),
      level:new FormControl('')
    });
  }

  uniqueTBA(){
    this.TBA=this.tba.reduce((acc, x) =>
   acc.concat(acc.find(y => y.j_code === x.j_code) ? [] : [x])
 , []);
 console.log('redu');
  }

  showStatus(job){
    console.log(job);
    let jc = job.j_code;
    this.jobCode = jc;

    this.candidates =[];

    for(var i=0;i<this.tba.length;i++){
      if(this.tba[i].j_code==jc && !this.tba[i].is_assigned){        
       
        
        this.candidates.push(this.tba[i].c_email); 
        console.log(this.candidates);
        
      }
    }
    this.j_id = job.j_id;
    this.displayAssign = !this.displayAssign;
  }

  onSubmit(){

    this.assignInterviewer.get('level').setValue("Level 1");
    this.assignInterviewer.get('j_code').setValue(this.jobCode);
    this.assignInterviewer.get('j_id').setValue(this.j_id);

    console.log(this.assignInterviewer.value);

    console.log(this.assignInterviewer.value.date+this.assignInterviewer.value.time);
    
    
    for(var i=0;i<this.interviewers.length;i++){
      if(this.assignInterviewer.value.interviewerEmail == this.interviewers[i].email){
        if(this.assignInterviewer.value.date == this.date && this.assignInterviewer.value.time == this.time){
          alert('not avialable');
          return;
        }
      }
    }    

    this.globalService.setServerAssigned(this.assignInterviewer.value).subscribe(res=>{
      console.log(res);
    });

    
    this.assignInterviewer.reset();
    
  }

}
