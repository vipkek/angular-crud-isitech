import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckUserResponseData, UserModel } from '../interface/models';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  checkUser(username: string): Observable<CheckUserResponseData> {
    return this.http.post<CheckUserResponseData>('/api/checkUsername', { username });
  }

  createUser(body: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>('/api/createUser', body);
  }

  deleteUser(username: string): Observable<string> {
    return this.http.delete<string>(`/api/deleteUser`, { params: { username } });
  }
  updateUser(body: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`/api/updateUser`, body);
  }
}
