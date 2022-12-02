import {api} from "../../axios/api";
import {ACTION_TYPES} from "../../types";
import {Dispatch} from "react";
import catchErrorMessage from "../../utils/catchErrorMessage";

export async function handleLoginAction(payload: object, dispatch:Dispatch<any>){
	return new Promise(async (resolve, reject)=>{
		api.post("/api/v1/auth/login", payload).then(({status, data})=>{
			if(status === 201){
				dispatch({
					type: ACTION_TYPES.LOGIN,
					payload: data
				})
				resolve(data)
			}
		}).catch(ex=>{
			reject(catchErrorMessage(ex))
		})
	})
}

export async function handleLogoutAction(dispatch: Dispatch<any>){
	return new Promise(async (resolve, reject)=>{
		api.get("/api/v1/auth/logout").then(({status, data})=>{
			if(status === 200){
				dispatch({
					type: ACTION_TYPES.LOGIN,
					payload: null
				})
				resolve(true)
			}
		}).catch(ex=>{
			reject(catchErrorMessage(ex))
		})
	})
}

export async function authFetchingAction(dispatch: Dispatch<any>){
	return new Promise(async (resolve, reject)=>{
		api.get("/api/v1/auth/current-auth").then(({status, data})=>{
			if(status === 200){
				dispatch({
					type: ACTION_TYPES.LOGIN,
					payload: data
				})
			}
		}).catch(ex=>{
			reject(catchErrorMessage(ex))
		})
	})
}

export async function fetchNotificationsAction(authId: string, dispatch: Dispatch<any>){
	return new Promise(async (resolve, reject)=>{
		api.get("/api/v1/notifications").then(({status, data})=>{
			if(status === 200){
				dispatch({
					type: ACTION_TYPES.FETCH_NOTIFICATION,
					payload: data
				})
			}
		}).catch(ex=>{
			reject(catchErrorMessage(ex))
		})
	})
}
