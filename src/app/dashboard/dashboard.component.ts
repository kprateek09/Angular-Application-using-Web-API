import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../DataService/UserDataService';
import { newUsers } from '../Models/newUsers';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tableHeaders = ['User ID', 'First Name', 'Last Name', 'Phone', 'Email'];
  
  data: newUsers[];
  users: newUsers[];
  tableRows = this.data;
  msg: any;
  enableEdit = false;
  enableEditIndex = null;
  constructor(
    private dataService: UserDataService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dataService.getAllUsers().subscribe(d => {
      this.data = d
      this.showData(this.data);
    })
  }

  showData(d) {
    this.users = d;
    console.log(d);
  }

  delete(data) {
    this.dataService.removeUser(data).subscribe(d => {
      this.msg = d
      this.check(this.msg);
    })
  }

  check(res) {
    if (res["result"] == "Success") {
      alert("User has been deleted Successfully");
      this.getData();
    }
    else if(res["result"] == "700")
    {
      alert("User Data is updated successfully");
      this.getData();
    }
    else if (res["result"] == "Failed") {
      alert("User wasn't deleted!");
    }
    else if(res["result"] == "701") {
      alert("User data is not updated!");
    }
  }

  update(data)
  {
    this.dataService.updateUser(data).subscribe(d =>
      {
        this.msg = d
        this.check(this.msg);
      })
  }

  enableEditMethod(e, i)
  {
    this.enableEdit = true;
    this.enableEditIndex = i;
    console.log(i, e);
  }

}
