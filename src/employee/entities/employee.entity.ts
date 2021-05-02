import { Document } from 'mongoose';

export class Employee extends Document {
    readonly employee_id: string;
    readonly first_name: string;
    readonly last_name: string;
    readonly age: string;
    readonly join_date: Date;
}
