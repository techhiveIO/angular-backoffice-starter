import {SettingsFacade} from './settings-facade.service';
import {async, TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {TranslateService} from '@ngx-translate/core';
import {AVAILABLE_LANGUAGES, READ_DIRECTIONS, SettingsStateInterface} from '../../../shared/models/settingsState.model';
import {MemoizedSelector} from '@ngrx/store';
import {selectCurrentLanguage} from '../settings.selector';

describe('SettingsFacadeService', () => {
  const mockedInitialSettingsState: SettingsStateInterface = {
    language: AVAILABLE_LANGUAGES.en,
    direction: READ_DIRECTIONS.LTR,
  };

  let service: SettingsFacade;
  let store: MockStore;
  let mockedTranslateService: jasmine.SpyObj<TranslateService>;
  let mockedCurrentLanguageSelector: MemoizedSelector<SettingsStateInterface, string>;

  const configureTestingModule: () => void = () => {
    mockedTranslateService = jasmine.createSpyObj(TranslateService, ['use']);

    TestBed.configureTestingModule({
      providers: [
        SettingsFacade,
        provideMockStore({initialState: mockedInitialSettingsState}),
        {provide: TranslateService, useValue: mockedTranslateService},
      ],
    });

    store = TestBed.inject(MockStore);
    mockedCurrentLanguageSelector = store.overrideSelector(
      selectCurrentLanguage,
      mockedInitialSettingsState.language,
    );
    service = TestBed.inject(SettingsFacade);
  };

  describe('onInit', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    it('should set the default language from the store', () => {
      expect(mockedTranslateService.use).toHaveBeenCalledTimes(1);
      expect(mockedTranslateService.use).toHaveBeenCalledWith(mockedInitialSettingsState.language);
    });
  });

  describe('setLanguage', () => {
    beforeEach(async(() => {
      configureTestingModule();
      mockedTranslateService.use.calls.reset();
    }));

    it('should set the language in the translate service', () => {
      service.setLanguage(AVAILABLE_LANGUAGES.en);
      expect(mockedTranslateService.use).toHaveBeenCalledTimes(1);
      expect(mockedTranslateService.use).toHaveBeenCalledWith(AVAILABLE_LANGUAGES.en);
    });
  });

  describe('getCurrentLanguage', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    it('should return an observable of the current language', () => {
      service.getCurrentLanguage()
        .subscribe((lang: string) => {
          expect(lang).toBe(mockedInitialSettingsState.language);
        });
    });
  });

  describe('getCurrentReadDirection', () => {
    beforeEach(async(() => {
      configureTestingModule();
    }));

    it('should return an observable of the current read direction', () => {
      service.getCurrentReadDirection()
        .subscribe((direction: READ_DIRECTIONS) => {
          expect(direction).toBe(mockedInitialSettingsState.direction);
        });
    });
  });
});
