import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {authReducer} from './auth/store/auth.reducer';
import {AuthStateInterface} from '../shared/models/authState.model';
import {settingsReducer} from './settings/settings.reducer';
import {SettingsStateInterface} from '../shared/models/settingsState.model';
import {storageMetaReducer} from './meta-reducers/storage.meta-reducer';

export const metaReducers: MetaReducer<any>[] = [storageMetaReducer];

export const reducers: ActionReducerMap<CoreState> = {
  settings: settingsReducer,
  auth: authReducer,
};

export interface CoreState {
  settings: SettingsStateInterface;
  auth: AuthStateInterface;
}
