import { Schema } from 'mongoose';
import { EmployeeModel } from './Employee';
import { IFullTimeEmployee, EmployeeType } from './types';

// FullTime Employee Schema
const FullTimeEmployeeSchema = new Schema({
    salary: {
        type: Number,
        required: true,
        min: [0, 'Salary cannot be negative'],
    },
    benefits: {
        type: [String],
        default: [],
    },
});

// FullTime Model Discriminator (Nested under Employee)
export const FullTimeEmployeeModel = EmployeeModel.discriminator<IFullTimeEmployee>(
    EmployeeType.FullTime,
    FullTimeEmployeeSchema
);
