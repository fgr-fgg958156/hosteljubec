import { dataLogin } from "../utils/storage.js";

export const API = 'https://68065840e81df7060eb6d4f4.mockapi.io/users';

export async function getUsers() {
    const response = await fetch(API);
    if (!response.ok) throw new Error();
    return await response.json();
}

export async function getCurrentUser() {
    const data = dataLogin();
    const users = await getUsers();

    return users.find(
        u => u.nickname.toLowerCase() === data.nickname?.toLowerCase()
    );
}

export async function getProject(projectName, userName) {
    const users = await getUsers();
    const user = users.find(
        u => u.nickname.toLowerCase() === userName?.toLowerCase()
    );

    return user?.projects.find(
        p => p.fileName.toLowerCase() === projectName?.toLowerCase()
    );
}

export async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

export async function updateUser(user, keys, data) {
    const updates = {};

    keys.forEach((key, index) => {
        updates[key] = data[index];
    });

    const response = await fetch(`${API}/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...user,
            ...updates
        })
    });

    if (!response.ok) throw new Error('update_error');

    return await response.json();
}