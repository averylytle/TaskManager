import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /*nullable bc sometimes user is not logged in*/
  currentUser?: User;

  //method
  loginUser(user: User) {
    console.log("Log in the user with email " + user.email)
    this.currentUser = user
  }

}

interface User {
  email?: null | string
}
