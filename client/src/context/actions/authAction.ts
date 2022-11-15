import {api} from "../../axios/api";
import {ACTION_TYPES} from "../../types";
import {Dispatch} from "react";

export async function handleLoginAction(payload, dispatch){
	return new Promise(async (resolve, reject)=>{
		api.post("/api/v1/login", payload).then(({status, data})=>{
			if(status === 200){
				dispatch({
					type: ACTION_TYPES.LOGIN,
					payload: data
				})
			}
		}).catch(ex=>{
			console.log(ex)
		})
	})
}

export async function authFetchingAction(dispatch: Dispatch<any>){
	return new Promise(async (resolve, reject)=>{
		api.get("/api/v1/current-auth").then(({status, data})=>{
			if(status === 200){
				dispatch({
					type: ACTION_TYPES.LOGIN,
					payload: data
				})
			}
		}).catch(ex=>{
			console.log(ex)
		})
	})
}
