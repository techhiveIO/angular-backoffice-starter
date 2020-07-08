import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {take} from 'rxjs/operators';
import {AVAILABLE_LANGUAGES, READ_DIRECTIONS, SettingsStateInterface} from '../../../shared/models/settingsState.model';
import {selectCurrentDirection, selectCurrentLanguage} from '../settings.selector';
import {actionSetLanguage} from '../settings.actions';

@Injectable({
  providedIn: 'root',
})
export class SettingsFacade {
  constructor(
    private readonly settingsStore: Store<SettingsStateInterface>,
    private readonly translateService: TranslateService,
  ) {
    this.settingsStore.pipe(select(selectCurrentLanguage), take(1))
      .subscribe((lang) => {
        this.setLanguage(lang);
      });
  }

  public setLanguage(lang: string) {
    this.translateService.use(lang.toLowerCase());
    this.settingsStore.dispatch(actionSetLanguage({payload: {language: AVAILABLE_LANGUAGES[lang]}}));
  }

  public getCurrentLanguage(): Observable<string> {
    return this.settingsStore.pipe(select(selectCurrentLanguage));
  }

  public getCurrentReadDirection(): Observable<READ_DIRECTIONS> {
    return this.settingsStore.pipe(select(selectCurrentDirection));
  }
}
