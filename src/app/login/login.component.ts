import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { Users } from '../Models/Users';
import { UserDataService } from '../DataService/UserDataService';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;
  data: Users[];
  msg: any;
  result: Users;
  constructor(
    private fb: FormBuilder,
    private dataService: UserDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginform = this.fb.group({
      UserId: '',
      Password: ''
    })
  }

  check(res) {
    //console.log(res["result"]);
    if (res["result"] == "Success") {
      this.loginform.reset();
      this.router.navigate(['/dashboard']);
    }
    else if (res["result"] == "Failed") {
      alert("Wrong Password!");
      this.loginform.reset();
    }
    else if (res["result"] == "UserId does not exist") {
      alert("UserId does not exist");
      this.loginform.reset();
    }
    else if (res["result"] == "UserId not entered") {
      alert("UserId not entered");
      this.loginform.reset();
    }
  }

  saveData(data: Users) {
    let user: Users = this.loginform.value;
    console.log(user);
    this.dataService.sendData(
      user)
      .subscribe(d => {
        this.msg = d
        this.check(this.msg);
      })
  }

}
