import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
    employee_id: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    join_date: {
        type: Date,
        required: true,
        default: new Date()
    },
    update_date: {
        type: Date
    }
})