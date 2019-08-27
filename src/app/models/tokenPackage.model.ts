import { User } from './user.model';

export interface TokenPackage {
    expiration: Date;
    token: string;
    user: User;
}