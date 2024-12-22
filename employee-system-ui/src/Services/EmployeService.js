import axios from "axios";

const employee_Base_url = "http://localhost:8080/employeeManagementSystem/";
const post_Employee = "addEmployee";
const get_all_employee = "getAllEmployees";
const delete_Employee = "deleteEmployee";
const get_Employee = "getEmployee";
const modify_Employee = "modifyEmployee";

class EmployeeService {
  saveEmployee(employee) {
    return axios.post(employee_Base_url + post_Employee, employee);
  }
  getEmployees() {
    return axios.get(employee_Base_url + get_all_employee);
  }
  deleteEmployee(id) {
    return axios.delete(employee_Base_url + delete_Employee + "/" + id);
  }
  getEmployeeById(id) {
    return axios.get(employee_Base_url + get_Employee + "/" + id);
  }
  updateEmployee(id, employee) {
    return axios.put(employee_Base_url + modify_Employee + "/" + id, employee);
  }
}

export default new EmployeeService();
