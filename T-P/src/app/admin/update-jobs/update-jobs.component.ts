import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-jobs',
  templateUrl: './update-jobs.component.html',
  styleUrls: ['./update-jobs.component.css']
})
export class UpdateJobsComponent implements OnInit {

  jobs = [];
  displayForm: boolean;
  updateJobs:FormGroup;

  constructor(private globalService : DataService) { 
    this.initializeForm();
  }

  ngOnInit() {
    this.getJobs();
  }

  initializeForm(){
    this.updateJobs = new FormGroup({
      
    })

  }

  getJobs(){
    this.globalService.getServerJobs().subscribe(res=>{
      this.jobs = res;
    })
  }

  updateJob(job){
    this.displayForm = !this.displayForm;
    console.log(job);
    
  }

}
