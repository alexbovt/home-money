import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import _ from 'lodash';

import {UsersService} from '../../shared/services/users.service';
import {Message} from '../../shared/models/message.model';
import AuthService from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private userService: UsersService,
    private  authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.message = new Message('', 'danger');
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    });

    this.route.queryParams.subscribe(params => {
      if (_.isEmpty(params)) {
        return;
      }
      const {email, isLoginPossible} = params;

      if (isLoginPossible) {
        this.showMessage(new Message(`Now you can log in using ${email}`, 'success'));
      }
      if (email) {
        this.form.get('email').setValue(email);
      }
    });
  }

  onSubmit() {
    const {email, password} = this.form.value;

    this.userService.getUserByEmail(email)
      .subscribe(user => {
        if (user) {
          if (user.password === password) {
            this.hideMessage();
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage(new Message('Wrong password !'));
          }
        } else {
          this.showMessage(new Message(`There are no users with email ${email} !`));
        }
      });
  }

  private showMessage(message: Message) {
    this.message = message;

    setTimeout(() => this.hideMessage(), 5000);
  }

  private hideMessage() {
    this.message = new Message('', 'danger');
  }
}
