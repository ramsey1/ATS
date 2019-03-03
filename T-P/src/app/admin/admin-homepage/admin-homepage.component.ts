import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

  constructor() { }

  textShow:boolean;

  ngOnInit() {
  }


  openNav(){
    document.getElementById("mySidenav").style.width = "250px";
    this.textShow=true;

  }

  closeNav(){
    document.getElementById("mySidenav").style.width = "0px";
    this.textShow=false;
  }

}
