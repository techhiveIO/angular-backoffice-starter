import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterEvent} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {map, startWith, tap} from 'rxjs/operators';
import {NavigationLinkInterface} from './shared/models/navigation-link.model';
import {NavigationMenuLinks} from './shared/consts/navigation-links.consts';
import {AVAILABLE_LANGUAGES, READ_DIRECTIONS, SettingsStateInterface} from './shared/models/settingsState.model';
import {select, Store} from '@ngrx/store';
import {selectCurrentDirection} from './core/settings/settings.selector';
import {actionSetLanguage} from './core/settings/settings.actions';

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
    private readonly translateService: TranslateService,
    private readonly settingsStore: Store<SettingsStateInterface>,
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((e: RouterEvent) => {
      if (e instanceof NavigationStart) {

        this.loadMembersLayout = !e.url.includes('/auth');
      }
    });

    this.currentReadDirection$ = this.settingsStore.pipe(select(selectCurrentDirection));
    this.currentLanguage$ = this.translateService.onLangChange.pipe(
      startWith({lang: AVAILABLE_LANGUAGES.en}),
      tap(v => this.settingsStore.dispatch(actionSetLanguage({payload: {language: AVAILABLE_LANGUAGES[v.lang]}}))),
      map(v => `TRANSLATION.${v.lang.toUpperCase()}`),
    );
  }

  changeLanguage(lang: string): void {
    this.translateService.use(lang.toLowerCase());
  }

  toggleDrawer(): void {
    this.drawerOpened = !this.drawerOpened;
  }
}
