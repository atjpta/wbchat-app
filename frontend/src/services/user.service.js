import { createApiClient } from "./api.service";

class UserService {
    constructor(baseUrl = "/api/users") {
		this.api = createApiClient(baseUrl, true);
	}
    async getAllUser() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async testuser() {
        // return (await this.api.get(`/test/user`)).data;
        return console.log((await this.api.get(`/test/user`)).data);;
    }

    async testadmin() {
        // return (await this.api.get(`/test/admin`)).data;
        return console.log((await this.api.get(`/test/admin`)).data);;

    }
}
export default new UserService();
