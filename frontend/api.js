import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";


class BackendApi {
    // Method to get the list of users
    static async getUsers() {
        const response = await axios.get(`${BASE_URL}/users`);
                return response.data; 
    }

    // Method to create a new user
    static async createUser(userData) {
        const response = await axios.post(`${BASE_URL}/users`, userData);
        return response.data; 
    }

    // Method to get a specific user by id
    static async getUserById(userId) {
        const response = await axios.get(`${BASE_URL}/users/${userId}`);
        return response.data; 
    }

    // Method to delete a user by id
    static async deleteUser(userId) {
        const response = await axios.delete(`${BASE_URL}/users/${userId}`);
        return response.data; 
    }

    // Method to update a user by id
    static async updateUser(userId, userData) {
        const response = await axios.put(`${BASE_URL}/users/${userId}`, userData);
        return response.data; 
    }
}

export default BackendApi;
