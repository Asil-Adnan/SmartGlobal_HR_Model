"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateModel = void 0;
const mongoose_1 = require("mongoose");
const Person_1 = require("./Person");
const types_1 = require("./types");
// Candidate Schema
const CandidateSchema = new mongoose_1.Schema({
    appliedRole: {
        type: String,
        required: true,
        trim: true,
    },
    interviewStatus: {
        type: String,
        enum: Object.values(types_1.InterviewStatus),
        default: types_1.InterviewStatus.Pending,
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
exports.CandidateModel = Person_1.PersonModel.discriminator(types_1.PersonType.Candidate, CandidateSchema);
