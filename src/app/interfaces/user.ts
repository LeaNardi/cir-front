export interface User {
    userId: number;
    username: string; 
    email: string;
    name: string;
    surname: string;
    dni: string;
    role: string;
}

export interface UserDTO {
    userId: number;
    username: string; 
    email: string;
    name: string;
    surname: string;
    dni: string;
    role_id: number
}

export interface UserCreateDTO {
    username: string; 
    email: string;
    password: string;
    name: string;
    surname: string;
    dni: string;
    role_id: number
}

export interface UserAuthDTO {
    username: string; 
    password: string;
}