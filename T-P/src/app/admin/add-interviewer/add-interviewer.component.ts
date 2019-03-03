import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { roles } from '../role-lists';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-add-interviewer',
  templateUrl: './add-interviewer.component.html',
  styleUrls: ['./add-interviewer.component.css']
})
export class AddInterviewerComponent implements OnInit {

  constructor(private globalService : DataService) { 
    this.initializeform();
  }

  interviewRole = roles;

  interviewer:any;

  addInterviewer: FormGroup;

  initializeform() {
    this.addInterviewer = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      role: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.getInterviewer();  
  }

  getInterviewer(){
    this.globalService.getServerInterviewer().subscribe(res=>{
      this.interviewer = res;
    });
  }

  onSubmit(){
    console.log(this.addInterviewer.value);
    this.globalService.setServerInterviewer(this.addInterviewer.value).subscribe(res=>{
      console.log(res);
    })

    this.addInterviewer.value.role = 'interviewer';

    console.log('register',this.addInterviewer.value);
  
    this.globalService.setServerRegister(this.addInterviewer.value).subscribe(res=>{
        console.log(res);
      });

    this.addInterviewer.reset();
  }

}
