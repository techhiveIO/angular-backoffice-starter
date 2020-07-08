import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SettingsStateInterface} from '../../shared/models/settingsState.model';

export const selectSettingsState = createFeatureSelector<SettingsStateInterface>('settings');

export const selectCurrentLanguage = createSelector(selectSettingsState, (state: SettingsStateInterface) => state.language);
export const selectCurrentDirection = createSelector(selectSettingsState, (state: SettingsStateInterface) => state.direction);
