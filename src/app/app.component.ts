import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loadMembersLayout = true;
  drawerOpened = false;

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((e: RouterEvent) => {
      if (e instanceof NavigationStart) {
        this.loadMembersLayout = !e.url.includes('/auth');
      }
    });
  }

  toggleDrawer(): void {
    this.drawerOpened = !this.drawerOpened;
  }
}
