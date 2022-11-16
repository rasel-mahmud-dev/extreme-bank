import axios from "axios";
// const backend = "http://localhost:3001"
const backend = "http://192.168.136.224:3001"

export const api = axios.create({
	baseURL: backend,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true,
	timeout: 300000,
})
