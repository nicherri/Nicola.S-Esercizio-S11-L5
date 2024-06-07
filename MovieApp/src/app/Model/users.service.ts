import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iUsers } from '../interfaces/users';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  private usersSubject = new BehaviorSubject<iUsers[]>([]);
  users$ = this.usersSubject.asObservable();

  getAllUsers() {
    this.http.get<iUsers[]>(environment.usersUrl)
      .subscribe(users => this.usersSubject.next(users));
  }

  getUserById(userId: number) {
    return this.http.get<iUsers>(`${environment.usersUrl}/${userId}`);
  }
}
