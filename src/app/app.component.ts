import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterEvent} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NavigationLinkInterface} from './shared/models/navigation-link.model';
import {NavigationMenuLinks} from './shared/consts/navigation-links.consts';
import {AVAILABLE_LANGUAGES, READ_DIRECTIONS} from './shared/models/settingsState.model';
import {SettingsFacade} from './core/settings/services';
import {AuthFacade} from './core/auth/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loadMembersLayout = true;
  drawerOpened = false;

  currentReadDirection$: Observable<READ_DIRECTIONS>;
  availableLocales = Object.values(AVAILABLE_LANGUAGES);
  currentLanguage$: Observable<string>;

  navigationLinks: NavigationLinkInterface[] = NavigationMenuLinks;

  constructor(
    private readonly router: Router,
    private readonly authFacade: AuthFacade,
    private readonly settingsFacade: SettingsFacade,
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((e: RouterEvent) => {
      if (e instanceof NavigationStart) {
        this.loadMembersLayout = !e.url.includes('/auth');
      }
    });

    this.currentReadDirection$ = this.settingsFacade.getCurrentReadDirection();
    this.currentLanguage$ = this.settingsFacade.getCurrentLanguage()
      .pipe(
        map((lang: string) => `TRANSLATION.${lang.toUpperCase()}`),
      );
  }

  changeLanguage(lang: string): void {
    this.settingsFacade.setLanguage(lang);
  }

  toggleDrawer(): void {
    this.drawerOpened = !this.drawerOpened;
  }

  logOutUser(): void {
    this.authFacade.signOut();
  }
}
