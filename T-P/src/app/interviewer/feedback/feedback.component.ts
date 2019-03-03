import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  interviewerName:any;

  i_email:any;

  assigned:any;

  interviewers:any;

  resList=[];

  constructor(private globalService : DataService,private router:Router, private cookieService :CookieService) { 
    if(this.cookieService.check('email')){
      this.i_email=this.cookieService.get('email');
    }
    else{
    this.i_email = this.router.getCurrentNavigation().extras.state.email;
   }
  }

  async ngOnInit() {
    this.assigned = await this.globalService.getAssigned();
    this.interviewers = await this.globalService.getInterviewer();

    for(var i=0;i<this.interviewers.length;i++){
      if(this.i_email==this.interviewers[i].email){
        this.interviewerName = this.interviewers[i].name;
      }
    }

    this.getList();
  }

  getList(){
    for(var i=0;i<this.assigned.length;i++){
      if(this.i_email==this.assigned[i].i_email){
        this.resList.push(this.assigned[i]);
      }
    }
    console.log(this.resList);
  }

  feedback(mapped){
    console.log(mapped);
    this.globalService.updateServerAssigned(mapped).subscribe(res=>{
      console.log(res);
    });
  }
  }


