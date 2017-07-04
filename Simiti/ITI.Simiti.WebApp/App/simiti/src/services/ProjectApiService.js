import { getAsync, postAsync, putAsync, deleteAsync } from '../helpers/apiHelper'

const endpoint = "/api/project";

class  ProjectApiService {
    constructor() {

    }

    async getProjectAsync(ProjecN){
        return await getAsync(`${endpoint}/${ProjectId}`);
    }

    async createProjectAsync(model) {
        return await postAsync(`${endpoint}/${model.userId}`, model);
    }
}
export default new ProjectApiService()