import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  username: string | null = '';
  usernameSubscription: Subscription | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {    
    this.usernameSubscription = this.userService.getUsername().subscribe((username) => {
      this.username = username;
    });
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  logout() {
    this.userService.logout();
  }

  ngOnDestroy(): void {
    if (this.usernameSubscription) {
      this.usernameSubscription.unsubscribe();
    }
  }
}
