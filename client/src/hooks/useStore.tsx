import {Dispatch, useContext} from "react";
import AppContext, {RootStateType} from "../context/AppContext";
import {dispatch} from  "../context/AppContext"

function useStore(): [RootStateType, Dispatch<any>]{
	const store = useContext(AppContext)
	return [store, dispatch]
}

export default useStore