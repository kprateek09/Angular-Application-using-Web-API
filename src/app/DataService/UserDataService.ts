import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../Models/Users';
import { Injectable, ErrorHandler } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { newUsers } from '../Models/newUsers';

@Injectable()

export class UserDataService {

    //baseUrl = "https://localhost:5001/api/";
    newBaseUrl = "https://localhost:44389/api/";

    constructor(
        private http: HttpClient
    ) { }

    sendData(formData : Users) : Observable<any> {
        //const body = JSON.stringify(userData);
        //const headerOptions = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post<any>(this.newBaseUrl + 'ValidateUser', formData );
    }

    getAllUsers() : Observable<newUsers[]> {
        return this.http.get<newUsers[]>(this.newBaseUrl + "getUsers").pipe(retry(1));
    }

    postUserData(formData : newUsers) : Observable<any> {
        return this.http.post<any>(this.newBaseUrl + "addUser", formData);
    }

    removeUser(data) : Observable<any> {
        return this.http.get<any>(this.newBaseUrl + "deleteUser/" + data).pipe(retry(1));
    }

    updateUser(formData : newUsers) : Observable<any> {
        return this.http.post<any>(this.newBaseUrl + "updateUser", formData);
    }
}