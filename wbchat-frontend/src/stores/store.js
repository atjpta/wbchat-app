import { defineStore } from "pinia";
import socket from "../socket";
import AuthService from "@/services/auth.service";
export const useStore = defineStore("store", {
	state() {
		return {
			user: null,
			socket: socket,
			socket_session: null,

		};
	},
	getters: {
		isUserLoggedIn(state) {
			return !!state.user && !!state.user.accessToken;
		},
	},
	actions: {
		// connectSocket(){
		// 	socket.auth = {
		// 		user: {
		// 			id_user : this.user.id,
		// 			name : this.user.name,
		// 			token : this.user.accessToken,
		// 		},
		// 		sessionID: this.socket_session,
		// 	};
		// 	socket.connect();
		// },
		
		// reConnectSocket(){
		// 	socket.on("session", ({ sessionID, userID }) => {
		// 		// attach the session ID to the next reconnection attempts
		// 		socket.auth = { sessionID };
		// 		// store it in the localStorage
		// 		localStorage.setItem("sessionID", sessionID);
		// 		// save the ID of the user
		// 		socket.userID = userID;
		// 	  });
		// },

		// loadSessionID(){
		// 	this.socket_session = (localStorage.getItem("sessionID"))
		// },
		loadAuthState() {
			this.user = JSON.parse(localStorage.getItem("user"));
		},
		logout() {
			this.user = null;
			localStorage.removeItem("user");
			localStorage.removeItem("sessionID");
			
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
			this.socket.auth = {
				user : this.user,
			};
			this.socket.connect();
			return response;
		},
		register(user) {
			this.user = null;
			return AuthService.register(user);
		},
	},
});
