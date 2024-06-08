// export interface User {
//     id: number | null;
//     username: string; 
//     email: string;
//     password?: string;
//     name: string;
//     surname: string;
//     dni: string;
// }

export interface UserDTO {
    id: number;
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