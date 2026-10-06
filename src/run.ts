import * as operations from "./operations";

function run(title: string, action: () => void): void {
  console.log(`\n${title}`);
  try {
    action();
  } catch (error) {
    console.log("Error:", (error as Error).message);
  }
}

run("Add employees", operations.addEmployees);
run("Get all employees", operations.getAllEmployees);
run("Get employee L1", operations.getEmployee);
run("Update employee E2", operations.updateEmployee);
run("Delete employee E2", operations.deleteEmployee);

run("Add employee with duplicate id", operations.addDuplicateId);
run("Add second CEO", operations.addSecondCeo);
run("Add engineer reporting to a manager", operations.addEngineerUnderManager);
run("Add engineer with invalid reportsTo id", operations.addWithInvalidReportsTo);
run("Add employee with empty name", operations.addWithEmptyName);
run("Add employee with wrong date format", operations.addWithWrongDateFormat);
run("Update employee that does not exist", operations.updateMissingEmployee);
run("Get employee that does not exist", operations.getMissingEmployee);
run("Delete employee with reportees", operations.deleteEmployeeWithReportees);
