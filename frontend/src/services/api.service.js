import axios from "axios";
import { useStore } from "../stores/store";
import app from "@/main";

const commonConfig = {
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
};

export const createApiClient = (baseURL, withAuthToken = false) => {
	const api = axios.create({
		baseURL,
		...commonConfig,
	});

	if (withAuthToken) {
		api.interceptors.request.use((config) => {
			const auth = useStore();

			const user = auth.user;
			if (user && user.accessToken) {
				config.headers.authorization = user.accessToken;
			}
			return config;
			
		});

		api.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				if (error.response.status == 403) {
					app.$router.push({ name: "login" });
				}
				return Promise.reject(error);
			}
		);
	}

	return api;
};
