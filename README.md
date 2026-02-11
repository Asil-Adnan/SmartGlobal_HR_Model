# SmartGlobal HR Data Model

Candidate / Employee data model built with **Node.js, MongoDB (Mongoose), and TypeScript**.
(assesment for developer position, Smart Global Domestic Workers Services Center - submitted by Asil Adnan)

This project demonstrates a polymorphic architecture using **Mongoose discriminators** to support multiple people and employment types without duplication, while remaining easy to extend for future roles.

---

## Architecture Overview

This project uses a **2-level discriminator hierarchy**:

Person (Base Schema)  
├── Candidate  
└── Employee  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── FullTimeEmployee  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── ContractEmployee  

All documents are stored in a **single MongoDB collection (`people`)** using discriminator keys:

- `type` → Candidate / Employee  
- `employmentType` → FullTime / Contract  

This ensures:

- No field duplication  
- Clean polymorphism  
- Easy extension for new employee types  
- Efficient querying  

---

## Key Features

- Clean polymorphic schema design  
- Strong TypeScript typing (no `any`)  
- Mongoose discriminator hierarchy  
- Schema-level validation & constraints  
- Extensible architecture (add new type with one schema)  
- Centralized shared fields  
- Indexed for performance  
- Sample seed data included  

---

## Technologies Used

- Node.js  
- MongoDB  
- Mongoose  
- TypeScript  

---

## Data Model Design

### Base: Person

Shared fields across all types:

- First Name  
- Last Name  
- Email (unique)  
- Phone  
- Status  
- CreatedAt / UpdatedAt  

---

### Candidate

Candidate-specific fields:

- Applied Role  
- Interview Status  
- Resume URL  
- Expected Salary  
- Evaluation (score + notes)  

---

### Employee

Shared employee fields:

- Employee ID (unique, sparse)  
- Department  
- Joining Date  
- Manager Reference  

---

### Full-Time Employee

- Salary  
- Benefits  

---

### Contract Employee

- Hourly Rate  
- Contract End Date  
- Agency Name  

Includes validation ensuring **contract end date > joining date**.

---

## Validation Rules

- Email format enforced  
- Enum validation for status, department, type  
- Salary / rate must be ≥ 0  
- Contract end date must be after joining date  
- Required fields enforced at schema level  

---

## Indexing

Indexes included for efficient querying:

- `email`  
- `type`  
- `department`  
- `employmentType`  
- `employeeId` (unique, sparse)  
- `managerId`  

---

## Extensibility

Adding a new employee type requires **only one step**:

1. Create a new discriminator schema under `Employee`  
2. No refactor required  
3. No changes to existing schemas  

Example future types:

- Part-Time Employee  
- Intern  
- Consultant  
- Remote Contractor  

---

## Project Structure

SmartGlobal/  
├── src/  
│   ├── models/  
│   │   ├── Person.ts  
│   │   ├── Candidate.ts  
│   │   ├── Employee.ts  
│   │   ├── FullTimeEmployee.ts  
│   │   ├── ContractEmployee.ts  
│   │   ├── types.ts  
│   │   └── index.ts  
│   └── seed.ts  
├── package.json  
├── tsconfig.json  
└── README.md  

---

## Setup & Installation

### 1. Install dependencies

```
npm install
```

### 2. Start MongoDB locally

Default connection:

```
mongodb://127.0.0.1:27017/smart-global-hr
```

---

## Run Seed Script

Populates sample data:

- Candidate  
- Full-Time Employee  
- Contract Employee  

```
npm run seed
```

---

## Example Queries

### Get all people

```ts
await PersonModel.find({});
```

### Get all employees (polymorphic)

```ts
await PersonModel.find({ type: "Employee" });
```

### Get full-time employees only

```ts
await FullTimeEmployeeModel.find({});
```

---

## Design Goals Achieved

- Clean polymorphic architecture  
- No duplicated fields  
- Fully TypeScript-safe  
- Easy to extend  
- Schema validation enforced  
- Production-ready structure  

---

## Improvement Plans

- Phone & URL format validation  
- Soft delete / audit logging  
- Pagination utilities  
- Compound query indexes  
- Environment-based DB config  
- Lean query optimization  

---

## Author

**Asil Adnan**

---

## License

MIT
