import axios from "axios";

const backend = import.meta.env.DEV ? "http://localhost:1000": "https://extreme-bank.vercel.app"
// const backend = "http://192.168.136.224:3001"

export const api = axios.create({
	baseURL: backend,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true,
	timeout: 300000,
})
