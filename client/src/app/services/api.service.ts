import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FitUser } from '../models/fit-user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postRegistration(registerObj: FitUser) {
    return this.http.post<FitUser>("http://localhost:5000/api/fitness/register", registerObj);
  }

  getRegisteredUser() {
    return this.http.get<FitUser[]>("http://localhost:5000/api/fitness/get-all");
  }

  updateRegisterUser(registerObj: FitUser, id: string) {
    return this.http.put<FitUser>("http://localhost:5000/api/fitness/update/" + id, registerObj);
  }

  deleteRegistered(id: string) {
    return this.http.delete<FitUser>("http://localhost:5000/api/fitness/delete/" + id);
  }

  getRegisteredUserId(id: string) {
    return this.http.get<FitUser>("http://localhost:5000/api/fitness/get-fit-user-by-id/" + id);
  }
}
