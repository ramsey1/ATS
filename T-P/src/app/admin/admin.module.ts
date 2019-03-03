import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostJobsComponent } from './post-jobs/post-jobs.component';
import { AddInterviewerComponent } from './add-interviewer/add-interviewer.component';
import { AssignInterviewerComponent } from './assign-interviewer/assign-interviewer.component';
import { InterviewStatusComponent } from './interview-status/interview-status.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UpdateJobsComponent } from './update-jobs/update-jobs.component';


@NgModule({
  declarations: [PostJobsComponent, AddInterviewerComponent, AssignInterviewerComponent, InterviewStatusComponent, CandidateDetailsComponent, AdminHomepageComponent, UpdateJobsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,RouterModule
  ],
  exports:[PostJobsComponent, AddInterviewerComponent, AssignInterviewerComponent, InterviewStatusComponent, CandidateDetailsComponent,AdminHomepageComponent]
})
export class AdminModule { }
