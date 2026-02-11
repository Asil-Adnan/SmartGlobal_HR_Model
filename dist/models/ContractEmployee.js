"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractEmployeeModel = void 0;
const mongoose_1 = require("mongoose");
const Employee_1 = require("./Employee");
const types_1 = require("./types");
// Contract Employee Schema
const ContractEmployeeSchema = new mongoose_1.Schema({
    hourlyRate: {
        type: Number,
        required: true,
        min: [0, 'Hourly rate cannot be negative'],
    },
    contractEndDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (v) {
                // 'this' refers to the document being validated.
                // During updates, 'this' might be undefined, so we check.
                if (!this.joiningDate)
                    return true;
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
exports.ContractEmployeeModel = Employee_1.EmployeeModel.discriminator(types_1.EmployeeType.Contract, ContractEmployeeSchema);
