import {createContext, Dispatch,  useReducer} from "react";
import {ACTION_TYPES} from "../types";

export const AppContext = createContext({})

export let dispatch: Dispatch<any>;

export interface RootStateType {
	auth: any
}

const initialState: RootStateType = {
	auth: null
}

function reducer(state: RootStateType, action) {
	let updateState = {...state}
	
	switch (action.type) {
		case ACTION_TYPES.LOGIN:
			updateState.auth = action.payload
			return updateState
		default:
			return state
	}
}


function AppProvider(props) {
	
	const [state, dispatchState] = useReducer(reducer, initialState )
	dispatch = dispatchState
	
	return (
		<AppContext.Provider value={state}>{props.children}</AppContext.Provider>
	)
	
}

export default AppProvider