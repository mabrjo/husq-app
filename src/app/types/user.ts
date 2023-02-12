import { Husq } from "./husq";

export interface User {
    id?: number;
    name: string;
    bio: string;
    profilePic: string;
    password: string;

    following?: number[];
    followers?: number[];
}
