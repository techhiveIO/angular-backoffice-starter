import {createAction, props} from '@ngrx/store';
import {AVAILABLE_LANGUAGES} from '../../shared/models/settingsState.model';

export enum SettingsActionTypes {
  SET_LANGUAGE = '[Settings] Language',
}

export const actionSetLanguage = createAction(
  SettingsActionTypes.SET_LANGUAGE,
  props<{
    payload: { language: AVAILABLE_LANGUAGES }
  }>()
);
