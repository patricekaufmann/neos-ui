import {createStore} from 'redux';
import merge from 'lodash.merge';

import {handleActions} from 'Shared/Utilities/index';

import {
    reducer as NodeToolbarReducer,
    actionTypes as NodeToolbarActionTypes,
    initialState as NodeToolbarInitialState,
    actions as NodeToolbar
} from './NodeToolbar/index';
import {
    reducer as CKEditorToolbarReducer,
    actionTypes as CKEditorToolbarActionTypes,
    initialState as CKEditorToolbarInitialState,
    actions as CKEditorToolbar
} from './CKEditorToolbar/index';

const reducers = {
    ...NodeToolbarReducer,
    ...CKEditorToolbarReducer
};
const rootReducer = handleActions(reducers);
const devToolsStoreEnhancer = () => typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f;
const initialState = {
    nodeToolbar: NodeToolbarInitialState,
    ckEditorToolbar: CKEditorToolbarInitialState
};

//
// Export the store factory
//
export function configureStore() {
    const mergedInitialState = merge({}, initialState);
    return createStore(rootReducer, mergedInitialState, devToolsStoreEnhancer());
}

//
// Export the action types
//
export const actionTypes = {
    NodeToolbar: NodeToolbarActionTypes,
    CKEditorToolbar: CKEditorToolbarActionTypes
};

//
// Export the actions
//
export const actions = {
    NodeToolbar,
    CKEditorToolbar
};
