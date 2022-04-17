import createHttp from "./http.service";
class ContactService {
    constructor() {
        this.http = createHttp("/api/users");
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
