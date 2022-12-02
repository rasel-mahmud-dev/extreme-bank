import { Dispatch, useReducer, useState } from "react";
import { ACTION_TYPES } from "../types";
import AppContext from "./AppContext";

export let dispatch: Dispatch<any>;

export interface AppContextInterface {
    auth: any;
    account?: object;
    isAuthLoaded: boolean;
    notifications: any[];
    isSidebarExpand: boolean;
}

const initialState: AppContextInterface = {
    auth: null,
    account: undefined,
    isAuthLoaded: false,
    isSidebarExpand: false,
    notifications: [],
};

function reducer(state: AppContextInterface, action: any) {
    switch (action.type) {
        case ACTION_TYPES.FETCH_NOTIFICATION:
            return {
                ...state,
                notifications: action.payload,
            };
        case ACTION_TYPES.SET_ACCOUNT:
            return {
                ...state,
                account: action.payload,
            };
        case ACTION_TYPES.SET_NOTIFICATION:
            return {
                ...state,
                notifications: [action.payload, ...state.notifications],
            };
        case ACTION_TYPES.SET_ACCOUNT:
            return {
                ...state,
                account: action.payload,
            };
        case ACTION_TYPES.LOGIN:
            return {
                ...state,
                isAuthLoaded: true,
                auth: action.payload,
            };

        case ACTION_TYPES.LOGOUT:
            return {
                ...state,
                isAuthLoaded: true,
                account: undefined,
                notifications: [],
                auth: null,
                isSidebarExpand: false,
            };
        case ACTION_TYPES.TOGGLE_SIDEBAR:
            return {
                ...state,
                isSidebarExpand: !state.isSidebarExpand,
            };

        default:
            return state;
    }
}

function AppProvider(props) {
    const [state, dispatchState] = useReducer(reducer, initialState);
    dispatch = dispatchState;

    return <AppContext.Provider value={state}>{props.children}</AppContext.Provider>;
}

export default AppProvider;
