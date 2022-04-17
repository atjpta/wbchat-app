import createHttp from "./http.service";
class authService {
    constructor() {
        this.http = createHttp("/api/auth");
    }
    async create(data) {
        return (await this.http.post(`/signup`, data)).data;
    }

    async login(data) {
        return (await this.http.post(`/signin`, data)).data;
    }
    
}
export default new authService();
