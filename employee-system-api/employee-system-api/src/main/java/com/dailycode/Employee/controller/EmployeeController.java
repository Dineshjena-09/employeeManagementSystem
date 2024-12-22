package com.dailycode.Employee.controller;

import com.dailycode.Employee.model.Employee;
import com.dailycode.Employee.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/employeeManagementSystem")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }
    @PostMapping("/addEmployee")
    public Employee createEmployee(@RequestBody Employee employee){
        return employeeService.createEmployee(employee);
    }
    @GetMapping("/getAllEmployees")
    public List<Employee> getAllEmployees(){
        return employeeService.getAllEmployees();
    }
    @DeleteMapping("/deleteEmployee/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable Long id){
        boolean deleted=false;
        deleted=employeeService.deleteEmployee(id);
        Map<String,Boolean> response=new HashMap<>();
        response.put("deleted",deleted);
        return  ResponseEntity.ok(response);
    }
    @GetMapping("/getEmployee/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id){
        Employee employee = employeeService.getEmployeeId(id);
        return ResponseEntity.ok(employee);
    }
    @PutMapping("/modifyEmployee/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id ,@RequestBody Employee employee){
        employee=employeeService.updateEmployee(id,employee);
        return ResponseEntity.ok(employee);

    }


 }
