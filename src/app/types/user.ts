export interface User {
    "userId": string,
    "userName": string,
    "userEmail": string,
    "userSkype": string
}

export interface UserForAuth {
    uid: string;
    email: string;
    displayName: string;
}