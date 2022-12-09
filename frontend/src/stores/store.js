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
			onls: [],
			keyFind: '',
			findUsers: [],
		};
	},
	getters: {
		isUserLoggedIn(state) {
			return !!state.user && !!state.user.accessToken;
		},

		find(State){
			if(State.keyFind.length > 0)
			{
				State.findUsers = State.users.filter(user => user.nameFind.indexOf(State.keyFind) > -1);
			}
			else State.findUsers = State.users;
		},
		onl(State){
			if(State.users){
				State.users.forEach(user => {
					// chuyển chuổi thành chữa thường để dễ tìm kiếm 
					user.nameFind = user.name.toLowerCase();
					if(State.onls.find((id) => id == user.id )){
						user.onl = true;
					}
					else user.onl = false;
				});
			}
		},
		sortUsers(State){
			if(State.users){
				State.users.sort((a, b) => {
					if (a.name < b.name)
						return -1;
					if (a.name > b.name)
						return 1;
					return 0;
				});
				State.users.sort((a) => {
					if (a.onl)
						return -1;
					if (!a.onl)
						return 1;
					return 0;
				});
			}
			
		}
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
			});
			
		},

		userOff(){
			// khi có người thoát
			this.socket.on("user disconnected", (id) => {
				this.onls = this.onls.filter(onl => onl != id.userID);
				this.onl;
				this.sortUsers
			});
		},

		userOnl(){
			// khi có người kết nối tới
			this.socket.on("user connected", (id) => {
				this.onls.push(id.userID);
				this.onl;
				this.sortUsers
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

		socketRefresh(){
			socket.on("refreshListUser", () => {
				this.getAllUser();
			})
		},


		socketConnet(){
			socket.auth = {
				user: this.user
			}
			socket.connect();
			socket.emit("add-user", this.user.id)
		},
		socketOnl(){
			socket.on("userOnl", (onlineUsers) => {
				this.onls = onlineUsers;
				
			})
		},
		


		async getAllUser(){
			this.users = (await userService.getAllUser());
			this.onl;
			this.sortUsers;
			this.find;
		},


		loadAuthState() {
			this.user = JSON.parse(localStorage.getItem("user"));
		},
		
		logout() {
			this.user = null;
			localStorage.removeItem("user");
			socket.disconnect();
			this.user = null,
			this.users = null,
			this.selectUser = null,
			this.msg = null,
			this.setMessages = [],
			this.onls = []
		},
		async login(user) {
			const response = await AuthService.login(user);

			if (!response.accessToken) {
				this.logout();
				throw new Error("Whoops, no access token found!");
			}
			this.user = response;
			localStorage.setItem("user", JSON.stringify(response));
			return response;
		},
		register(user) {
			socket.connect();
			socket.emit("userRegister")
			socket.disconnect();
			this.user = null;
			return AuthService.register(user);
		},
	},
});
