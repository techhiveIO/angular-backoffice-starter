import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterEvent} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {map, startWith, tap} from 'rxjs/operators';
import {AVAILABLE_LANGUAGES} from './shared/consts/translation.consts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loadMembersLayout = true;
  drawerOpened = false;

  availableLocales = AVAILABLE_LANGUAGES;
  direction: 'rtl' | 'ltr' = 'ltr';
  currentLanguage$: Observable<string>;

  constructor(
    private readonly router: Router,
    private readonly translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((e: RouterEvent) => {
      if (e instanceof NavigationStart) {

        this.loadMembersLayout = !e.url.includes('/auth');
      }
    });

    this.currentLanguage$ = this.translateService.onLangChange.pipe(
      startWith({lang: 'en'}),
      tap(v => this.direction = this.setDirection(v.lang)),
      map(v => `TRANSLATION.${v.lang.toUpperCase()}`),
    );
  }

  changeLanguage(lang: string): void {
    this.translateService.use(lang.toLowerCase());
  }

  toggleDrawer(): void {
    this.drawerOpened = !this.drawerOpened;
  }

  private setDirection(lang: string): 'ltr' | 'rtl' {
    return lang === 'ar' ? 'rtl' : 'ltr';
  }
}
