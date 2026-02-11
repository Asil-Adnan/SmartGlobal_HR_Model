"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Person_1 = require("./models/Person");
const Candidate_1 = require("./models/Candidate");
const FullTimeEmployee_1 = require("./models/FullTimeEmployee");
const ContractEmployee_1 = require("./models/ContractEmployee");
const types_1 = require("./models/types");
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const MONGO_URI = 'mongodb://127.0.0.1:27017/smart-global-hr';
            yield mongoose_1.default.connect(MONGO_URI);
            console.log('Connected to MongoDB');
            yield Person_1.PersonModel.deleteMany({});
            console.log('Cleared database');
            // 1. Create a Candidate
            const candidate = new Candidate_1.CandidateModel({
                firstName: 'Alice',
                lastName: 'Smith',
                email: 'alice@example.com',
                phone: '123-456-7890',
                status: types_1.Status.Active,
                // Discriminators automatically set their key if using the Model constructor
                // but for clarity we can see 'type' is PersonType.Candidate
                appliedRole: 'Senior Developer',
                interviewStatus: types_1.InterviewStatus.Scheduled,
                expectedSalary: 120000,
            });
            yield candidate.save();
            console.log('Candidate created:', candidate.toObject());
            // 2. Create a Full-Time Employee
            const ftEmployee = new FullTimeEmployee_1.FullTimeEmployeeModel({
                firstName: 'Bob',
                lastName: 'Jones',
                email: 'bob@example.com',
                phone: '098-765-4321',
                status: types_1.Status.Active,
                // Level 1: Employee properties
                employeeId: 'EMP001',
                department: types_1.Department.Engineering,
                joiningDate: new Date(),
                // Level 2: FullTime properties
                salary: 150000,
                benefits: ['Health', 'Dental', '401k'],
            });
            yield ftEmployee.save();
            console.log('FullTime Employee created:', ftEmployee.toObject());
            // 3. Create a Contract Employee
            const contractEmployee = new ContractEmployee_1.ContractEmployeeModel({
                firstName: 'Charlie',
                lastName: 'Brown',
                email: 'charlie@example.com',
                phone: '555-555-5555',
                status: types_1.Status.Active,
                // Level 1: Employee properties
                employeeId: 'EMP002',
                department: types_1.Department.Marketing,
                joiningDate: new Date(),
                // Level 2: Contract properties
                hourlyRate: 85,
                contractEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 1 year from now
                agencyName: 'TechTalent Inc.',
            });
            yield contractEmployee.save();
            console.log('Contract Employee created:', contractEmployee.toObject());
            // Query examples
            const allPeople = yield Person_1.PersonModel.find({});
            console.log(`Total People: ${allPeople.length}`);
            // Polymorphic Query: Find all "Employee" types (includes FullTime and Contract)
            // We can query on 'type' discriminator or use the EmployeeModel if it was exported/usable directly as a find target
            // Since Employee is a discriminator of Person, we can search by type.
            const allEmployees = yield Person_1.PersonModel.find({ type: types_1.PersonType.Employee });
            console.log(`Total Employees (Hierarchy Check): ${allEmployees.length}`);
            // Strict Type Query
            const fullTimeOnly = yield FullTimeEmployee_1.FullTimeEmployeeModel.find({});
            console.log(`Full Time Only: ${fullTimeOnly.length}`);
            process.exit(0);
        }
        catch (error) {
            console.error('Error seeding data:', error);
            process.exit(1);
        }
    });
}
seed();
