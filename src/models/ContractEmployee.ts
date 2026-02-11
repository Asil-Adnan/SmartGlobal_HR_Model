import { Schema } from 'mongoose';
import { EmployeeModel } from './Employee';
import { IContractEmployee, EmployeeType } from './types';
import { Document } from 'mongoose';

type ContractDocument = IContractEmployee & Document;

// Contract Employee Schema
const ContractEmployeeSchema = new Schema({
    hourlyRate: {
        type: Number,
        required: true,
        min: [0, 'Hourly rate cannot be negative'],
    },
    contractEndDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (this: ContractDocument, v: Date) {
                // 'this' refers to the document being validated.
                // During updates, 'this' might be undefined, so we check.
                if (!this.joiningDate) return true;
                return v > this.joiningDate;
            },
            message: 'Contract end date must be after joining date',
        },
    },
    agencyName: {
        type: String,
        trim: true,
    },
});

// Contract Model Discriminator (Nested under Employee)
export const ContractEmployeeModel = EmployeeModel.discriminator<IContractEmployee>(
    EmployeeType.Contract,
    ContractEmployeeSchema
);
