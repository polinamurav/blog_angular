import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserType} from "../../../../assets/types/user.type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;
  user: UserType;

  constructor(private _snackBar: MatSnackBar,
              private authService: AuthService,
              private router: Router) {
    this.isLogged = this.authService.getIsLoggedIn();
    this.user = {
      id: '',
      name: '',
      email: ''
    }
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;

      if (isLoggedIn) {
        this.loadUser();
      }
    });

    if (this.isLogged) {
      this.loadUser();
    }
  }

  loadUser() {
    this.authService.getUser().subscribe((data: UserType) => {
      this.user = data;
    });
  }

  logout() {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();
        },
        error: () => {
          this.doLogout();
        }
      })
  }

  doLogout() {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']);
  }
}
