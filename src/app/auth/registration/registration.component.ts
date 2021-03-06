import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
    private usersServices: UsersService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      name: new FormControl(null, [Validators.required]),
      agree: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  onSubmit() {
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);

    this.usersServices.createUser(user).subscribe(newUser => {
      this.router.navigate(['/login'], {
        queryParams: {
          email: newUser.email,
          isLoginPossible: true
        }
      })
      ;
    });
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise<any>(resolve => {
      this.usersServices.getUserByEmail(control.value).subscribe(user => {
        if (user) {
          resolve({forbiddenEmail: true});
        }
        resolve(null);
      });
    });
  }
}
