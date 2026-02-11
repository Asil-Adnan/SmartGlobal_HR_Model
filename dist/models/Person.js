"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const types_1 = require("./types");
const PersonSchema = new mongoose_1.Schema({
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
        enum: Object.values(types_1.Status),
        default: types_1.Status.Active,
        required: true,
    },
}, {
    timestamps: true,
    discriminatorKey: 'type',
    collection: 'people',
});
// Indexes
PersonSchema.index({ type: 1 });
PersonSchema.index({ email: 1 });
// Base Model
exports.PersonModel = mongoose_1.default.model('Person', PersonSchema);
