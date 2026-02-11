"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = exports.InterviewStatus = exports.Status = exports.EmployeeType = exports.PersonType = void 0;
// Enums
var PersonType;
(function (PersonType) {
    PersonType["Candidate"] = "Candidate";
    PersonType["Employee"] = "Employee";
})(PersonType || (exports.PersonType = PersonType = {}));
var EmployeeType;
(function (EmployeeType) {
    EmployeeType["FullTime"] = "FullTime";
    EmployeeType["Contract"] = "Contract";
})(EmployeeType || (exports.EmployeeType = EmployeeType = {}));
var Status;
(function (Status) {
    Status["Active"] = "Active";
    Status["Inactive"] = "Inactive";
    Status["OnHold"] = "OnHold";
})(Status || (exports.Status = Status = {}));
var InterviewStatus;
(function (InterviewStatus) {
    InterviewStatus["Pending"] = "Pending";
    InterviewStatus["Scheduled"] = "Scheduled";
    InterviewStatus["Accepted"] = "Accepted";
    InterviewStatus["Rejected"] = "Rejected";
})(InterviewStatus || (exports.InterviewStatus = InterviewStatus = {}));
var Department;
(function (Department) {
    Department["Engineering"] = "Engineering";
    Department["HR"] = "HR";
    Department["Sales"] = "Sales";
    Department["Marketing"] = "Marketing";
})(Department || (exports.Department = Department = {}));
