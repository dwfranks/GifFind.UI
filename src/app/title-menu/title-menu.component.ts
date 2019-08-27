import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../models/user.model';

@Component({
  selector: 'app-title-menu',
  templateUrl: './title-menu.component.html',
  styleUrls: ['./title-menu.component.scss']
})
export class TitleMenuComponent implements OnInit, OnDestroy {

  private destory$ = new Subject();

  showMenu = false;
  hasAuth = false;
  currentUser: User;

  constructor(private readonly authService: AuthService,
              private readonly router: Router) { }

  ngOnInit() {
    this.authService.currentUser
      .pipe(
        takeUntil(this.destory$)
      ).subscribe(user => {
        if (user) {
          this.currentUser = user.user;
        } else {
          this.currentUser = null;
        }
      });
  }

  onLogoClick() {
    this.showMenu = true;
  }

  handleClick() {
    this.showMenu = false;
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.showMenu = false;
  }

  ngOnDestroy() {
    this.destory$.next(true);
    this.destory$.unsubscribe();
  }
}
