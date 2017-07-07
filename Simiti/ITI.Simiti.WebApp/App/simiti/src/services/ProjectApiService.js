import { getAsync, postAsync, putAsync, deleteAsync } from '../helpers/apiHelper'

const endpoint = "/api/project";

class  ProjectApiService {
    constructor() {

    }
     async getAllProjectByUserIdAsync(userId){
         return await getAsync(`${endpoint}/getall/${userId}`);
     }

    async getProjectAsync(projecN, userId){
        return await getAsync(`${endpoint}/loadproj/${projecN}/${userId}`);
    }

    async createProjectAsync(model) {
        return await postAsync(`${endpoint}/saveproj/${model.userId}`, model);
    }
}
export default new ProjectApiService()