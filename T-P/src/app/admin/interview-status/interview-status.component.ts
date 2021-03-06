import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { slots } from '../slots';

@Component({
  selector: 'app-interview-status',
  templateUrl: './interview-status.component.html',
  styleUrls: ['./interview-status.component.css']
})
export class InterviewStatusComponent implements OnInit {

  constructor(private globalService: DataService,private router:Router) {
    this.initializeForm();
   }

  assigned = new Array;
  next:boolean;
  showTable:boolean;
  interviewers = new Array;

  mock= new Array;

  interviewSlots = slots;

  nextAssign=[];

  assignInterviewer:FormGroup;

  async ngOnInit() {
    this.getAssigned();
    this.getInterviewer();
    console.log(this.assigned);
  }

  getAssigned(){
    this.globalService.getServerAssigned().subscribe(res=>{
      this.assigned = res;
      console.log(this.assigned);
      this.getMock(this.assigned);  
    });
  }

  getMock(assigned){
      this.mock = assigned;
      for(var i=0;i<this.mock.length;i++){
        this.mock = this.removeDuplicates(this.mock,this.mock[i].c_email)
      }
      console.log(this.mock);
  }

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}

  getInterviewer(){
    this.globalService.getServerInterviewer().subscribe(res=>{
      this.interviewers = res;
      console.log(res);
      
    })
  }

  initializeForm(){
    this.assignInterviewer = new FormGroup({
      i_name:new FormControl(''),
      candidateEmail:new FormControl(''),
      candidateName:new FormControl(''),
      interviewerEmail:new FormControl(''),
      date:new FormControl(''),
      time:new FormControl(''),
      feedback:new FormControl(''),
      status:new FormControl(''),
      i_id:new FormControl(''),
      c_id:new FormControl(''),
      j_id:new FormControl(''),
      j_code:new FormControl(''),
      level:new FormControl(''),
      _id:new FormControl('')
    });
  }


  assignNext(status){
    console.log(status);
    this.nextAssign = status;
    this.interviewers = this.setInterviewers(this.interviewers,'email',status.i_email);
    this.next =!this.next;
    this.showTable =!this.showTable;
  }

  setInterviewers(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;

  }

  accept(status){
    // console.log(status);
    status.status= "Accept";
    // console.log(status);
    this.globalService.updateServerAssigned(status).subscribe(res=>{
      console.log(res);
    });
    
  
  }

  reject(status){
  //  console.log(status);
    status.status = "Reject";
    // console.log(status);
    this.globalService.updateServerAssigned(status).subscribe(res=>{
      console.log(res);
    });
    
  }

  onSubmit(){

    let int = this.getSpecificInterviewer();

    let ch = this.assignInterviewer.value.date+this.assignInterviewer.value.time; 

    for(var i=0;i<int.isAvailable.length;i++){
      console.log(int.isAvailable[i]);

      if(int.isAvailable[i]==ch){
        alert('Not Avialable Choose another time or date');
        return;
      }
    }
    
    
    this.assignInterviewer.get('candidateEmail').setValue(this.nextAssign['c_email']);
    this.assignInterviewer.get('j_code').setValue(this.nextAssign['j_code']);
    this.assignInterviewer.get('j_id').setValue(this.nextAssign['j_id']);
    this.assignInterviewer.get('status').setValue("Next");
  

    let lc = parseInt(this.nextAssign['level'].match(/\d+/),10);
    lc+=1;

    let level = "Level "+lc;

    this.assignInterviewer.get('level').setValue(level);

    console.log(this.assignInterviewer.value);

    this.globalService.setServerAssigned(this.assignInterviewer.value).subscribe(res=>{
      console.log(res);
      
    })
    
    this.assignInterviewer.reset();
 
    location.reload();
  }

  getSpecificInterviewer(){
    for(var i=0;i<this.interviewers.length;i++){
      if(this.assignInterviewer.value.interviewerEmail == this.interviewers[i].email){
        return this.interviewers[i];
      }
    }
  }

}
