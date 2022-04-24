import { defineStore } from "pinia";
import socket from "../socket";
import AuthService from "@/services/auth.service";
export const useStore = defineStore("store", {
	state() {
		return {
			user: null,
		};
	},
	getters: {
		isUserLoggedIn(state) {
			return !!state.user && !!state.user.accessToken;
		},
	},
	actions: {
		connectSocket(){
			socket.auth = {
				id_user : this.user.id,
				name : this.user.name,
				token : this.user.accessToken,
			};
			socket.connect();
		},
		
		
		// GetAllUserOnl(){
		// 	return socket.GetUsers();
		// },

		// CheckUserConnect(){
		// 	socket.userJustConneted();
		// },

		loadAuthState() {
			this.user = JSON.parse(localStorage.getItem("user"));
		},
		logout() {
			this.user = null;
			localStorage.removeItem("user");
			socket.disconnect();
		},
		async login(user) {
			const response = await AuthService.login(user);

			if (!response.accessToken) {
				this.logout();
				throw new Error("Whoops, no access token found!");
			}

			this.user = response;

			localStorage.setItem("user", JSON.stringify(response));
			socket.auth = {
				id_user : this.user.id,
				name : this.user.name,
				token : this.user.accessToken,
			};
			socket.connect();
			return response;
		},
		register(user) {
			this.user = null;
			return AuthService.register(user);
		},
	},
});
