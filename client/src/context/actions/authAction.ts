import {api} from "../../axios/api";
import {ACTION_TYPES} from "../../types";
import {Dispatch} from "react";
import catchErrorMessage from "../../utils/catchErrorMessage";

// import {
//     signInWithPopup,
//     GoogleAuthProvider,
//     signOut,
//     getAuth
// } from "firebase/auth";

// export function googleSignInAction() {
//     let auth = getAuth()
//     return new Promise(async (resolve, reject) => {
//         try {
//             const provider = new GoogleAuthProvider();
//             let result = await signInWithPopup(auth, provider);
//             const user = result.user;
//             if (user) {
//                 resolve(user);
//             }else{
//                 reject("Google login fail")
//             }
//
//         } catch (ex) {
//             reject(ex);
//         }
//     });
// }

export function firebaseSignOutAction(dispatch: Dispatch<{}>) {
    // let auth = getAuth()
    // return new Promise(async (resolve, _) => {
    //     try {
    //         localStorage.removeItem("token")
    //         dispatch({ type: "LOGOUT" });
    //         await signOut(auth)
    //     } catch (ex) {
    //
    //     }
    // });
}




export async function handleRegistrationAction(formData: FormData, dispatch:Dispatch<any>){
	return new Promise(async (resolve, reject)=>{

        api.post("/api/v1/auth/registration", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(({status, data})=>{
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
					type: ACTION_TYPES.LOGOUT
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
            dispatch({
                type: ACTION_TYPES.LOGIN,
                payload: null
            })
			// reject(catchErrorMessage(ex))
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
