# Organization Management

Organization management system in TypeScript. Employees can be added, updated, deleted and retrieved, and the reporting hierarchy is validated.

## MCQ answers

1. B
2. B
3. B
4. C
5. B

## Setup

Node.js and npm should be installed.

```
npm install
```

## Execution

```
npm start
```

This only compiles the code into the `dist` folder. It does not run any operation.

```
node dist/run.js
```

This runs `run.ts` and gives the output. The sequence in which the operations are executed is specified in `src/run.ts`. It calls all the operations one by one on mock data and prints the output of each one on the console.

To change the sequence or skip an operation, edit the `run(...)` lines in `src/run.ts` and run both the commands again.

## Project structure

```
- src
   -- employee.ts       (Designation enum, Employee class and class for each designation)
   -- organization.ts   (Organization class with CRUD operations and validations)
   -- operations.ts     (mock data and a function for each operation)
   -- run.ts            (runs all the operations in sequence)
- package.json
- tsconfig.json
```

## Design approach

- Employee is an abstract class with the common fields. Engineer, Lead, Manager, Director and CEO extend it.
- Organization class keeps all employees in a Map with id as key and has the add, get, update and delete methods.
- Reporting hierarchy is Engineer -> Lead -> Manager -> Director -> CEO. It is checked while adding an employee and while updating reportsTo.
- reportees list is updated by the Organization class when an employee is added, deleted or moved.
- For any invalid operation an Error is thrown with a message.

## Assumptions

- Employee id is a string given by the user.
- CEO has to be added first, then director and so on, as reportsTo should be an existing employee.
- id and designation of an employee cannot be updated.
- Employee having reportees cannot be deleted.
- Data is stored in memory only.
