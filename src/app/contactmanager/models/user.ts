import { Note } from './note';

export class User {
    id: number;
    bithDate: Date;
    name: string;
    avatar: string;
    bio: string;

    notes: Note[] = [];
}
