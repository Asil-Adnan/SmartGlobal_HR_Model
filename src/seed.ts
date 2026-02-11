import mongoose from 'mongoose';
import { PersonModel } from './models/Person';
import { CandidateModel } from './models/Candidate';
import { FullTimeEmployeeModel } from './models/FullTimeEmployee';
import { ContractEmployeeModel } from './models/ContractEmployee';
import { Department, Status, PersonType, InterviewStatus, EmployeeType } from './models/types';

async function seed() {
    try {
        const MONGO_URI = 'mongodb://127.0.0.1:27017/smart-global-hr';
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        await PersonModel.deleteMany({});
        console.log('Cleared database');

        // 1. Create a Candidate
        const candidate = new CandidateModel({
            firstName: 'Alice',
            lastName: 'Smith',
            email: 'alice@example.com',
            phone: '123-456-7890',
            status: Status.Active,
            // Discriminators automatically set their key if using the Model constructor
            // but for clarity we can see 'type' is PersonType.Candidate
            appliedRole: 'Senior Developer',
            interviewStatus: InterviewStatus.Scheduled,
            expectedSalary: 120000,
        });
        await candidate.save();
        console.log('Candidate created:', candidate.toObject());

        // 2. Create a Full-Time Employee
        const ftEmployee = new FullTimeEmployeeModel({
            firstName: 'Bob',
            lastName: 'Jones',
            email: 'bob@example.com',
            phone: '098-765-4321',
            status: Status.Active,
            // Level 1: Employee properties
            employeeId: 'EMP001',
            department: Department.Engineering,
            joiningDate: new Date(),
            // Level 2: FullTime properties
            salary: 150000,
            benefits: ['Health', 'Dental', '401k'],
        });
        await ftEmployee.save();
        console.log('FullTime Employee created:', ftEmployee.toObject());

        // 3. Create a Contract Employee
        const contractEmployee = new ContractEmployeeModel({
            firstName: 'Charlie',
            lastName: 'Brown',
            email: 'charlie@example.com',
            phone: '555-555-5555',
            status: Status.Active,
            // Level 1: Employee properties
            employeeId: 'EMP002',
            department: Department.Marketing,
            joiningDate: new Date(),
            // Level 2: Contract properties
            hourlyRate: 85,
            contractEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 1 year from now
            agencyName: 'TechTalent Inc.',
        });
        await contractEmployee.save();
        console.log('Contract Employee created:', contractEmployee.toObject());

        // Query examples
        const allPeople = await PersonModel.find({});
        console.log(`Total People: ${allPeople.length}`);

        // Polymorphic Query: Find all "Employee" types (includes FullTime and Contract)
        // We can query on 'type' discriminator or use the EmployeeModel if it was exported/usable directly as a find target
        // Since Employee is a discriminator of Person, we can search by type.
        const allEmployees = await PersonModel.find({ type: PersonType.Employee });
        console.log(`Total Employees (Hierarchy Check): ${allEmployees.length}`);

        // Strict Type Query
        const fullTimeOnly = await FullTimeEmployeeModel.find({});
        console.log(`Full Time Only: ${fullTimeOnly.length}`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seed();
