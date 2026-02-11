"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullTimeEmployeeModel = void 0;
const mongoose_1 = require("mongoose");
const Employee_1 = require("./Employee");
const types_1 = require("./types");
// FullTime Employee Schema
const FullTimeEmployeeSchema = new mongoose_1.Schema({
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
exports.FullTimeEmployeeModel = Employee_1.EmployeeModel.discriminator(types_1.EmployeeType.FullTime, FullTimeEmployeeSchema);
