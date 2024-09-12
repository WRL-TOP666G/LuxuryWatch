import {User} from "./user";

export interface Cart{
    id: number | undefined;
    user: User | undefined;
    status: string | undefined;
}
