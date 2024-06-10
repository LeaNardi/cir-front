export interface UserDTO {
    userId: number;
    username: string; 
    email: string;
    name: string;
    surname: string;
    dni: string;
    roles_ids: number[]
}

export interface UserCreateDTO {
    username: string; 
    email: string;
    password: string;
    name: string;
    surname: string;
    dni: string;
    roles_ids: number[]
}

export interface UserAuthDTO {
    username: string; 
    password: string;
}