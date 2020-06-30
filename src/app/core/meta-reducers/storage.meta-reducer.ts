// The fields from the state which we'd like to save
import {Action, ActionReducer} from '@ngrx/store';
import {LocalStorageFacade, localStorageKey} from '../services';

const stateKeys = ['settings.language', 'settings.direction'];

const getKeysFromState = (state: any, keysToRetrieve: string[]): any => {
  const newObj = {};

  keysToRetrieve.forEach((key: string) => {
    newObj[key] = state[key];
  });
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

    LocalStorageFacade.setSavedState(nextState);
    return nextState;
  };
}
