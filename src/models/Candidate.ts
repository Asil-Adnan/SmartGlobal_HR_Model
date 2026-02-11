import { Schema } from 'mongoose';
import { PersonModel, IPersonDocument } from './Person';
import { ICandidate, PersonType, InterviewStatus } from './types';

// Candidate Schema
const CandidateSchema = new Schema({
    appliedRole: {
        type: String,
        required: true,
        trim: true,
    },
    interviewStatus: {
        type: String,
        enum: Object.values(InterviewStatus),
        default: InterviewStatus.Pending,
        required: true,
    },
    resumeUrl: {
        type: String,
        trim: true,
    },
    expectedSalary: {
        type: Number,
        min: [0, 'Expected salary cannot be negative'],
    },
    evaluation: {
        score: { type: Number, min: 0, max: 10 },
        notes: { type: String, trim: true },
    },
});

// Candidate Model Discriminator
export const CandidateModel = PersonModel.discriminator<IPersonDocument & ICandidate>(
    PersonType.Candidate,
    CandidateSchema
);
