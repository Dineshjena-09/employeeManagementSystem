package com.dailycode.Employee.services;

import com.dailycode.Employee.model.Employee;

import java.util.List;

public interface EmployeeService {
    Employee createEmployee(Employee employee);
    List<Employee> getAllEmployees();
    boolean deleteEmployee(Long id);
    Employee getEmployeeId(Long id);
    Employee updateEmployee(Long id,Employee employee);
}
