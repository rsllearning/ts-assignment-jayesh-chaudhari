import { Designation, Employee } from "./employee";

const REPORTS_TO: Record<Designation, Designation | null> = {
  [Designation.Engineer]: Designation.Lead,
  [Designation.Lead]: Designation.Manager,
  [Designation.Manager]: Designation.Director,
  [Designation.Director]: Designation.CEO,
  [Designation.CEO]: null,
};

export interface EmployeeUpdate {
  name?: string;
  dateOfBirth?: string;
  reportsTo?: string;
}

export class Organization {
  private employees: Map<string, Employee> = new Map();

  addEmployee(employee: Employee): void {
    if (!employee.id.trim()) {
      throw new Error("Employee id is required");
    }
    this.validateName(employee.name);
    this.validateDate(employee.dateOfBirth);

    if (this.employees.has(employee.id)) {
      throw new Error(`Employee with id ${employee.id} already exists`);
    }
    if (employee.designation === Designation.CEO && this.hasCeo()) {
      throw new Error("Organization already has a CEO");
    }
    this.validateReportsTo(employee.designation, employee.reportsTo);

    this.employees.set(employee.id, employee);
    if (employee.reportsTo) {
      this.getEmployee(employee.reportsTo).reportees.push(employee.id);
    }
  }

  getAllEmployees(): Employee[] {
    return Array.from(this.employees.values());
  }

  getEmployee(id: string): Employee {
    const employee = this.employees.get(id);
    if (!employee) {
      throw new Error(`Employee with id ${id} not found`);
    }
    return employee;
  }

  updateEmployee(id: string, updates: EmployeeUpdate): Employee {
    const employee = this.getEmployee(id);

    if (updates.name !== undefined) {
      this.validateName(updates.name);
    }
    if (updates.dateOfBirth !== undefined) {
      this.validateDate(updates.dateOfBirth);
    }
    if (updates.reportsTo !== undefined) {
      this.validateReportsTo(employee.designation, updates.reportsTo);
    }

    if (updates.name !== undefined) {
      employee.name = updates.name;
    }
    if (updates.dateOfBirth !== undefined) {
      employee.dateOfBirth = updates.dateOfBirth;
    }
    if (updates.reportsTo !== undefined && updates.reportsTo !== employee.reportsTo) {
      this.removeFromReportees(employee);
      employee.reportsTo = updates.reportsTo;
      this.getEmployee(updates.reportsTo).reportees.push(employee.id);
    }
    return employee;
  }

  deleteEmployee(id: string): void {
    const employee = this.getEmployee(id);
    if (employee.reportees.length > 0) {
      throw new Error(`Cannot delete employee ${id} as they have reportees`);
    }
    this.removeFromReportees(employee);
    this.employees.delete(id);
  }

  private hasCeo(): boolean {
    return this.getAllEmployees().some((e) => e.designation === Designation.CEO);
  }

  private removeFromReportees(employee: Employee): void {
    if (employee.reportsTo) {
      const senior = this.getEmployee(employee.reportsTo);
      senior.reportees = senior.reportees.filter((id) => id !== employee.id);
    }
  }

  private validateName(name: string): void {
    if (!name.trim()) {
      throw new Error("Employee name is required");
    }
  }

  private validateDate(date: string): void {
    const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(date);
    if (!match) {
      throw new Error("dateOfBirth must be in mm/dd/yyyy format");
    }
    const month = Number(match[1]);
    const day = Number(match[2]);
    const year = Number(match[3]);
    const parsed = new Date(year, month - 1, day);
    if (parsed.getMonth() !== month - 1 || parsed.getDate() !== day) {
      throw new Error("dateOfBirth is not a valid date");
    }
  }

  private validateReportsTo(designation: Designation, reportsTo: string | null): void {
    const expected = REPORTS_TO[designation];
    if (expected === null) {
      if (reportsTo !== null) {
        throw new Error("CEO cannot report to anyone");
      }
      return;
    }
    if (!reportsTo) {
      throw new Error(`${designation} must report to a ${expected}`);
    }
    const senior = this.employees.get(reportsTo);
    if (!senior) {
      throw new Error(`reportsTo employee ${reportsTo} does not exist`);
    }
    if (senior.designation !== expected) {
      throw new Error(`${designation} can only report to a ${expected}`);
    }
  }
}
