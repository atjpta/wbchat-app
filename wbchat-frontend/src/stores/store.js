import { defineStore } from "pinia";
import socket from "../socket";
import AuthService from "@/services/auth.service";
import userService from "../services/user.service";
import messageService from "../services/message.Service";
export const useStore = defineStore("store", {
	state() {
		return {
			user: null,
			socket: socket,
			users: null,
			selectUser: null,
			msg: null,
			setMessages: [],
			setArrivalMessage: [],
		};
	},
	getters: {
		isUserLoggedIn(state) {
			return !!state.user && !!state.user.accessToken;
		},
	},
	actions: {

		async recieveMessage(){
			if(this.selectUser){
			const response = await (messageService.get({
				from: this.user.id,
				to: this.selectUser.id,
			  }));
			  this.setMessages = response ;
			}
		},

		socketRecieveMessage(){
			socket.on("msg-recieve", (msg) => {
				const msgs =[...this.setMessages];
				msgs.push({fromSelf: false, message: msg});
				this.setMessages = msgs;
				console.log(msg);
			});
			
		},

		async sendMessage(){
			if(this.msg){
				await (messageService.add({
					from: this.user.id,
					to: this.selectUser.id,
					message: this.msg,
				}));

				socket.emit("send-msg", {
					to: this.selectUser.id,
					from: this.user.id,
					message: this.msg,
				});
			}
			const msgs =[...this.setMessages];
			msgs.push({fromSelf: true, message: this.msg});
			this.setMessages = msgs;

			
		},


		socketConnet(){
			socket.auth = {
				user: this.user
			}
			socket.connect();
		},

		// socketOff(){
		// 	socket.off("send-msg");
		// 	socket.off("msg-recieve");
		// },
		


		async getAllUser(){
			this.users = (await userService.getAllUser()); 
		},


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
			socket.emit("add-user", this.user.id)
			
			socket.auth = {
				user: this.user
			}
			socket.connect();
			return response;
		},
		register(user) {
			this.user = null;
			return AuthService.register(user);
		},
	},
});
