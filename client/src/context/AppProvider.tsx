import { Dispatch, useReducer, useState} from "react";
import {ACTION_TYPES} from "../types";
import AppContext from "./AppContext";


export let dispatch: Dispatch<any>;

export interface AppContextInterface {
	auth: any
	name: string
}

const initialState: AppContextInterface = {
	auth: null,
	name:  "rase"
}

function reducer(state: AppContextInterface, action: any) {
	switch (action.type) {
		case ACTION_TYPES.LOGIN:
			// updateState.auth = action.payload
			return {
				...state,
				auth: action.payload
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