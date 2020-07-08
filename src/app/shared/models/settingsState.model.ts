export enum AVAILABLE_LANGUAGES {
  en = 'en',
  ar = 'ar',
}

export enum READ_DIRECTIONS {
  LTR = 'ltr',
  RTL = 'rtl',
}

export interface SettingsStateInterface {
  language: AVAILABLE_LANGUAGES;
  direction: READ_DIRECTIONS;
}
