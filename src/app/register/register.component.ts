import { Component, OnInit } from '@angular/core';
import { newUsers } from '../Models/newUsers';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserDataService } from '../DataService/UserDataService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Users: newUsers[];
  registerForm: FormGroup;
  msg: any;


  constructor(
    private dataService: UserDataService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      UserId: '',
      FirstName: '',
      LastName: '',
      Password: '',
      Phone: '',
      Email: ''
    })
  }
  postData() {
    let newUser = this.registerForm.value;
    console.log(newUser);
    this.dataService.postUserData(newUser).subscribe(d => {
      this.msg = d
      this.check(this.msg);
    })

  }
  check(data) {
    if (data["result"] == "Success") {
      alert("User added Successfully!");
      this.registerForm.reset();
    }
    else if (data["result"] == "Failed") {
      alert("User Already Exists!");
      this.registerForm.reset();
    }
  }


}
