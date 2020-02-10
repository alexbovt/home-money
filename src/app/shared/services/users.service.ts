import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseApi} from '../core/base-api';

import {User} from '../models/user.model';

@Injectable()
export class UsersService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.get<User>(`users?email=${email}`).pipe(
      map(users => users[0] || undefined)
    );
  }

  createUser(user: User): Observable<User> {
    return this.post<User, User>('users', user);
  }
}
