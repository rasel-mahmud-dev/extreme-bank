import {Dispatch} from "react";
import {api} from "../../axios/api";
import {ACTION_TYPES} from "../../types";
import catchErrorMessage from "../../utils/catchErrorMessage";

export async function getAccountInfoAction(dispatch:Dispatch<any>){
	return new Promise(async (resolve, reject)=>{
		api.get("/api/v1/account").then(({status, data})=>{
			if(status === 200){
				dispatch({
					type: ACTION_TYPES.SET_ACCOUNT,
					payload: data
				})
				resolve(data)
			}
		}).catch(ex=>{
			reject(catchErrorMessage(ex))
		})
	})
}


export async function markAsReadNotification(notificationIds: string[] = []){
	return new Promise(async (resolve, reject)=>{
		api.post("/api/v1/notifications/read", {notificationIds}).then(({status, data})=>{
			if(status === 201){
				resolve(data)
			}
		}).catch(ex=>{
			reject(catchErrorMessage(ex))
		})
	})
}