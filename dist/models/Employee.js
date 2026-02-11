"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModel = void 0;
const mongoose_1 = require("mongoose");
const Person_1 = require("./Person");
const types_1 = require("./types");
// Base Employee Schema
const EmployeeSchema = new mongoose_1.Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true,
        sparse: true, // Allow multiple nulls (for Candidates)
        trim: true,
    },
    department: {
        type: String,
        enum: Object.values(types_1.Department),
        required: true,
    },
    joiningDate: {
        type: Date,
        required: true,
    },
    managerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Person',
        index: true, // Sparse index for manager lookups
    },
}, {
    discriminatorKey: 'employmentType', // Level 2 Discriminator
});
// Indexes
EmployeeSchema.index({ employmentType: 1 });
EmployeeSchema.index({ department: 1 });
// Employee Model Discriminator (Abstract Base for Employees)
exports.EmployeeModel = Person_1.PersonModel.discriminator(types_1.PersonType.Employee, EmployeeSchema);
