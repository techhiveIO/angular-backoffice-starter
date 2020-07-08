// Source: https://medium.com/better-programming/sync-your-state-in-local-storage-with-ngrx-9d6ceba93fc0
// The fields from the state which we'd like to save
import {Action, ActionReducer} from '@ngrx/store';
import {LocalStorageFacade} from '../services';

const stateKeys = ['settings', 'auth'];

const getKeysFromState = (state: any, keysToRetrieve: string[]): any => {
  const newObj = {};

  keysToRetrieve.forEach((key: string) => {
    newObj[key] = state[key];
  });

  return newObj;
};

export function storageMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
  let onInit = true;

  return (state: S, action: A): S => {
    const nextState = reducer(state, action);

    if (onInit) {
      onInit = false;
      const savedState = LocalStorageFacade.returnSavedState();

      return {...nextState, ...savedState};
    }

    const stateToSave = getKeysFromState(nextState, stateKeys);
    LocalStorageFacade.setSavedState(stateToSave);
    return nextState;
  };
}
