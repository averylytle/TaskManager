import { Component, OnInit } from '@angular/core';
import { UserService } from './../api/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  form = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
    firstName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(35)])],
    lastName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(35)])]
  })

  ngOnInit(): void {
  }

  //sees if user is already registered
  checkUser(): void {
    const params = { email: this.form.get('email')?.value }

    this.userService
      .getUserDetailsUser(<any>params)
      .subscribe(
        this.login, e => {
          if (e.status != 404)
            console.error(e)
          }
        )
  }


  register() {

    if (this.form.invalid)
      return;

    console.log("Form Values:", this.form.value);

    this.userService.registerUser({ body: this.form.value })
      .subscribe(this.login, console.error)

  }

  private login = () => {
    this.authService.loginUser({ email: this.form.get('email')?.value })
    this.router.navigate(['/tasks'])
  }

}
