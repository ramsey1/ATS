import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit {
applicants= [];
  
  constructor(private globalService:DataService) { }


   ngOnInit() {
     this.getApplicants();

  }

  getApplicants(){
    this.globalService.getSevrerApplicant().subscribe(res=>{
      this.applicants = res;
    })

  }

}
