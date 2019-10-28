import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {first, map, single, take} from 'rxjs/operators';

import {User} from '../models/user.model';

@Injectable()
export class UsersService {

  private baseApiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseApiUrl}/users?email=${email}`)
      .pipe(
        map(users => users[0] || undefined)
      );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseApiUrl}/users`, user);
  }
}
