import axios from "axios";
import {getApiKey} from "../security";

const axiosInstance = axios.create({
	baseURL: "https://social-network.samuraijs.com/api/1.0/",
	withCredentials: true,
	headers: {
		"API-KEY": getApiKey()
	}
});

export const usersAPI = {
	getUsers(currentPage = 1, pageSize = 10) {
		return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => response.data);
	},
	follow(userId) {
		return axiosInstance.post(`follow/${userId}`)
	},
	unfollow(userId) {
		return axiosInstance.delete(`follow/${userId}`)
	},
	// getProfile(userId) {
	// 	console.warn("Obsolete method. Use profileAPI object")
	// 	return profileAPI.getProfile(userId);
	// }
}

export const profileAPI = {
	getProfile(userId) {
		return axiosInstance.get(`profile/` + userId);
	},
	getStatus(userId) {
		return axiosInstance.get(`profile/status/` + userId);
	},
	setStatus(status) {
		return axiosInstance.put(`profile/status`, {status});
	},
	savePhoto(photoFile) {
		const formData = new FormData();
		formData.append("image", photoFile);
		return axiosInstance.put(`profile/photo`, formData, {
			headers: {"Content-Type": "multipart/form-data"}
		});
	},
	saveProfile(profile) {
		return axiosInstance.put(`profile`, profile);
	}
}

export const authAPI = {
	me() {
		return axiosInstance.get(`auth/me`);
	},
	login(email, password, rememberMe = false, captcha = "") {
		return axiosInstance.post(`auth/login`, {email, password, rememberMe, captcha});
	},
	logout() {
		return axiosInstance.delete(`auth/login`);
	}
}

export const securityAPI = {
	getCaptchaURL() {
		return axiosInstance.get(`security/get-captcha-url`);
	}
}
