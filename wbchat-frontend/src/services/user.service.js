import { createApiClient } from "./api.service";

class ContactService {
    constructor(baseUrl = "/api/users") {
		this.api = createApiClient(baseUrl, true);
	}
    async get(id) {
        return (await this.http.get(`/${id}`)).data;
    }
    async create(data) {
        return (await this.http.post("/", data)).data;
    }
    async get(id) {
        return (await this.http.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.http.put(`/${id}`, data)).data;
    }

    async testuser() {
        return (await this.http.get(`/test/user`)).data;
    }

    async testuser() {
        return (await this.http.get(`/test/admin`)).data;
    }
}
export default new ContactService();
