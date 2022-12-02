import { Dispatch, useReducer, useState} from "react";
import {ACTION_TYPES} from "../types";
import AppContext from "./AppContext";


export let dispatch: Dispatch<any>;

export interface AppContextInterface {
	auth: any
	name: string
	account: object,
	isAuthLoaded: boolean,
    notifications: any[]
}

const initialState: AppContextInterface = {
	auth: null,
	account: {},
	isAuthLoaded: false,
	name:  "rase",
    notifications: []
}

function reducer(state: AppContextInterface, action: any) {
	switch (action.type) {
		case ACTION_TYPES.FETCH_NOTIFICATION:
			return {
				...state,
				notifications: action.payload
			}
            case ACTION_TYPES.SET_ACCOUNT:
			return {
				...state,
				account: action.payload
			}
		case ACTION_TYPES.LOGIN:
			// updateState.index.js = action.payload
			return {
				...state,
				isAuthLoaded: true,
				auth: action.payload
			}
		
		case ACTION_TYPES.LOGOUT:
			// updateState.index.js = action.payload
			return {
				...state,
				isAuthLoaded: true,
				auth: null
			}
			
		default:
			return state
	}
}


function AppProvider(props) {
	const [state, dispatchState] = useReducer(reducer,   initialState )
	dispatch = dispatchState
	
	return (
		<AppContext.Provider value={state}>{props.children}</AppContext.Provider>
	)
}

export default AppProvider