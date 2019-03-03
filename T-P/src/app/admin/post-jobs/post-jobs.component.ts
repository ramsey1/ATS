import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-post-jobs',
  templateUrl: './post-jobs.component.html',
  styleUrls: ['./post-jobs.component.css']
})
export class PostJobsComponent implements OnInit {

  constructor(private globalService :DataService) {
    this.initializeForm();
   }

  postJobs: FormGroup;

  jobs : any;

   ngOnInit() {
    this.getJobs();
    console.log(this.jobs);
    
  }

  getJobs(){
    this.globalService.getServerJobs().subscribe(res=>{
      this.jobs = res;
    })

  }

  initializeForm(){
    this.postJobs = new FormGroup({
      jobCode: new FormControl('',Validators.required),
      jobProfile: new FormControl('',Validators.required),
      vacancies: new FormControl('',Validators.required),
      baseSal: new FormControl('',Validators.required),
      enrollType: new FormControl('',Validators.required),
      jobLoc: new FormControl('',Validators.required),
      jobDesc: new FormControl('',Validators.required),
      eductReq: new FormControl('',Validators.required),
      skillsReq: new FormControl('',Validators.required)
    });
  }

  onSubmit(){
    console.log(this.postJobs.value);
    this.globalService.setServerJobs(this.postJobs.value).subscribe(res=>{
      console.log(res);
    });

    this.postJobs.reset();
  }
}
