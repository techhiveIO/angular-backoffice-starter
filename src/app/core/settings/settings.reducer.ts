import {AVAILABLE_LANGUAGES, READ_DIRECTIONS, SettingsStateInterface} from '../../shared/models/settingsState.model';
import {Action, createReducer, on} from '@ngrx/store';
import {actionSetLanguage} from './settings.actions';

export const initialState: SettingsStateInterface = {
  language: AVAILABLE_LANGUAGES.en,
  direction: READ_DIRECTIONS.LTR,
};

const reducer = createReducer(
  initialState,
  on(actionSetLanguage, (state, action) => ({
    ...state,
    language: action.payload.language,
    direction: action.payload.language === AVAILABLE_LANGUAGES.ar ? READ_DIRECTIONS.RTL : READ_DIRECTIONS.LTR,
  })),
);

export function settingsReducer(state: SettingsStateInterface | undefined, action: Action) {
  return reducer(state, action);
}
