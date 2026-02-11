import { Types } from 'mongoose';

// Enums
export enum PersonType {
    Candidate = 'Candidate',
    Employee = 'Employee',
}

export enum EmployeeType {
    FullTime = 'FullTime',
    Contract = 'Contract',
}

export enum Status {
    Active = 'Active',
    Inactive = 'Inactive',
    OnHold = 'OnHold',
}

export enum InterviewStatus {
    Pending = 'Pending',
    Scheduled = 'Scheduled',
    Accepted = 'Accepted',
    Rejected = 'Rejected',
}

export enum Department {
    Engineering = 'Engineering',
    HR = 'HR',
    Sales = 'Sales',
    Marketing = 'Marketing',
}

// Interfaces
export interface IStart {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    type: PersonType; // Discriminator Key
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICandidate extends IStart {
    appliedRole: string;
    interviewStatus: InterviewStatus;
    resumeUrl?: string;
    expectedSalary?: number;
    evaluation?: {
        score: number;
        notes: string;
    };
}

export interface IEmployee extends IStart {
    employeeId: string;
    department: Department;
    joiningDate: Date;
    managerId?: Types.ObjectId; // Reference to person
    employmentType: EmployeeType; // Nested Discriminator Key
}

export interface IFullTimeEmployee extends IEmployee {
    salary: number;
    benefits: string[];
}

export interface IContractEmployee extends IEmployee {
    hourlyRate: number;
    contractEndDate: Date;
    agencyName?: string;
}
