import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  users: Observable<User[]>;
  isDarkTheme = false;
  dir = 'ltr';

  constructor(private router: Router, zone: NgZone , private userService: UserService) {

    this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));

   }

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  ngOnInit() {
    this.users = this.userService.users;
    this.userService.loadAll();

    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir() {
    this.dir = this.dir === 'ltr' ? 'rtl' : 'ltr';
    this.sidenav.toggle().then(() => this.sidenav.toggle());
  }

  isScreenSmall(): boolean {

    return this.mediaMatcher.matches;
  }

}
