import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  email:any;

  user={
    email: ""
  };

  constructor(private globalService : DataService,private router:Router,private cookieService :CookieService) { 
    if(this.cookieService.check('email')){
      this.email=this.cookieService.get('email');
    }
    else{
    this.email = this.router.getCurrentNavigation().extras.state.email;
   }
  }

  status = [];
  mock=[];


  ngOnInit() {
    this.user.email = this.email;
    this.getStatus(this.user);
  }

  getStatus(user){
    this.globalService.getOneAssigned(user).subscribe(res=>{
      this.status = res;
      console.log(res);
      // this.getSpecificApplicant(this.email,this.status)
      
    })

  }

  getSpecificApplicant(email,assigned){
    for(var i=0;i<assigned.length;i++){
      if(assigned[i].c_email==email){
        this.mock.push(assigned[i]);
      }
    }
    console.log('mock',this.mock);
    

  }

}
