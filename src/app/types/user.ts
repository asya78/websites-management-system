export interface User {
    "userId": string,
    "userName": string,
    "userEmail": string,
    "userSkype": string
}

export interface UserForAuth {
    username: string;
    email: string;
    password: string;
    repassword: string;
  }