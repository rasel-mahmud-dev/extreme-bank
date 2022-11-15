import axios from "axios";
const backend = "http://localhost:3001"

export const api = axios.create({
	baseURL: backend
})
