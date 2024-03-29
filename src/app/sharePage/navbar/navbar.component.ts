import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../../backend/auth-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '_navbar.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private authenticationSub!: Subscription;
  userAuthenticated = false;

  constructor(private authService: AuthService) { }

  ngOnDestroy(): void {
    this.authenticationSub.unsubscribe();
  };

  ngOnInit(): void {

    this.userAuthenticated = this.authService.getIsAuthenticated();
    this.authenticationSub = this.authService.getAuthenticatedSub().subscribe(status => {
      this.userAuthenticated = status;
    })
  };

  logOut() {
    this.authService.logOut();
  }

}
