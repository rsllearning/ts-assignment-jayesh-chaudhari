import { CEO, Director, Engineer, Lead, Manager } from "./employee";
import { Organization } from "./organization";

const org = new Organization();

export function addEmployees(): void {
  org.addEmployee(new CEO("C1", "Anita Rao", "04/12/1975"));
  org.addEmployee(new Director("D1", "Rahul Mehta", "09/23/1980", "C1"));
  org.addEmployee(new Manager("M1", "Sneha Kulkarni", "01/15/1985", "D1"));
  org.addEmployee(new Lead("L1", "Amit Joshi", "06/30/1990", "M1"));
  org.addEmployee(new Lead("L2", "Priya Nair", "11/05/1991", "M1"));
  org.addEmployee(new Engineer("E1", "Rohan Patil", "03/18/1997", "L1"));
  org.addEmployee(new Engineer("E2", "Neha Shah", "08/09/1998", "L1"));
  console.log("Employees added");
}

export function getAllEmployees(): void {
  console.table(org.getAllEmployees());
}

export function getEmployee(): void {
  console.log(org.getEmployee("L1"));
}

export function updateEmployee(): void {
  console.log(org.updateEmployee("E2", { name: "Neha Desai", reportsTo: "L2" }));
  console.log(org.getEmployee("L1"));
  console.log(org.getEmployee("L2"));
}

export function deleteEmployee(): void {
  org.deleteEmployee("E2");
  console.table(org.getAllEmployees());
}

export function addDuplicateId(): void {
  org.addEmployee(new Engineer("E1", "Karan Singh", "02/02/1999", "L1"));
}

export function addSecondCeo(): void {
  org.addEmployee(new CEO("C2", "Vikram Iyer", "07/07/1970"));
}

export function addEngineerUnderManager(): void {
  org.addEmployee(new Engineer("E3", "Karan Singh", "02/02/1999", "M1"));
}

export function addWithInvalidReportsTo(): void {
  org.addEmployee(new Engineer("E3", "Karan Singh", "02/02/1999", "L9"));
}

export function addWithEmptyName(): void {
  org.addEmployee(new Engineer("E3", "", "02/02/1999", "L1"));
}

export function addWithWrongDateFormat(): void {
  org.addEmployee(new Engineer("E3", "Karan Singh", "1999-02-02", "L1"));
}

export function updateMissingEmployee(): void {
  org.updateEmployee("E9", { name: "Test" });
}

export function getMissingEmployee(): void {
  org.getEmployee("E9");
}

export function deleteEmployeeWithReportees(): void {
  org.deleteEmployee("L1");
}
