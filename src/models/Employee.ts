import { Schema } from 'mongoose';
import { PersonModel, IPersonDocument } from './Person';
import { IEmployee, PersonType, Department, EmployeeType } from './types';

// Base Employee Schema
const EmployeeSchema = new Schema(
    {
        employeeId: {
            type: String,
            required: true,
            unique: true,
            sparse: true, // Allow multiple nulls (for Candidates)
            trim: true,
        },
        department: {
            type: String,
            enum: Object.values(Department),
            required: true,
        },
        joiningDate: {
            type: Date,
            required: true,
        },
        managerId: {
            type: Schema.Types.ObjectId,
            ref: 'Person',
            index: true, // Sparse index for manager lookups
        },
    },
    {
        discriminatorKey: 'employmentType', // Level 2 Discriminator
    }
);

// Indexes
EmployeeSchema.index({ employmentType: 1 });
EmployeeSchema.index({ department: 1 });

// Employee Model Discriminator (Abstract Base for Employees)
export const EmployeeModel = PersonModel.discriminator<IPersonDocument & IEmployee>(
    PersonType.Employee,
    EmployeeSchema
);
