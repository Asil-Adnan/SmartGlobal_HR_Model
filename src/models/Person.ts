import mongoose, { Schema, Document, Model } from 'mongoose';
import { PersonType, Status, IStart } from './types';

export type IPersonDocument = IStart & Document;

const PersonSchema: Schema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: [2, 'First name must be at least 2 characters'],
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minlength: [2, 'Last name must be at least 2 characters'],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill a valid email address',
            ],
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: Object.values(Status),
            default: Status.Active,
            required: true,
        },
    },
    {
        timestamps: true,
        discriminatorKey: 'type',
        collection: 'people',
    }
);

// Indexes
PersonSchema.index({ type: 1 });
PersonSchema.index({ email: 1 });

// Base Model
export const PersonModel: Model<IPersonDocument> = mongoose.model<IPersonDocument>(
    'Person',
    PersonSchema
);
