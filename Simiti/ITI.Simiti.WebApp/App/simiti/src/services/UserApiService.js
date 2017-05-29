import { getAsync, postAsync, putAsync, deleteAsync } from '../helpers/apiHelper'

const endpoint = "/api/user";

class UserApiService {
    constructor() {

    }

    async signUpUser(){
        return await postAsync(`${endpoint}/inscription`);
    }
    /*async getStudentListAsync() {
        return await getAsync(endpoint);
    }

    async getStudentByNameAsync(firstName, lastName) {
        return await getAsync(`${endpoint}/RechercherName/${firstName}/${lastName}`);
    }*/

    async getUserAsync(emailUser) {
        return await getAsync(`${endpoint}/users/${emailUser}`);
    }

    async updateUserAsync(model) {
        return await putAsync(`${endpoint}/${model.userId}`, model);
    }

    /*async createStudentAsync(model) {
        return await postAsync(endpoint, model);
    }

    

    async deleteStudentAsync(studentId) {
        return await deleteAsync(`${endpoint}/${studentId}`);
    }

    async assignStudentToclassAsync(studentId, classId) {
        return await postAsync(`${endpoint}/${studentId}/assignClass`, { classId: classId });
    }*/
}

export default new UserApiService()