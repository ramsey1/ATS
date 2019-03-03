import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {


  verificationForm : FormGroup;

  mob:any;

  constructor(private route:Router) {   
    if(localStorage.getItem('vmob')){
      this.mob = localStorage.getItem('vmob');
}
else{
  this.mob = this.route.getCurrentNavigation().extras.state.mob;
  localStorage.setItem('vmob',this.mob);
}
    this.initializeForm();
  }

  ngOnInit() {
  }

  initializeForm(){
    this.verificationForm = new FormGroup({
      otp:new FormControl('',Validators.required)
    });
  }

  onSubmit(){
    console.log(this.verificationForm.value);

    localStorage.removeItem('vmob');
  }

}
