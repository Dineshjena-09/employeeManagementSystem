package com.dailycode.Employee.services;

import com.dailycode.Employee.entity.EmployeeEntity;
import com.dailycode.Employee.model.Employee;
import com.dailycode.Employee.repository.EmployeeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    private EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee createEmployee(Employee employee) {
        EmployeeEntity employeeEntity=new EmployeeEntity();
        BeanUtils.copyProperties(employee,employeeEntity);
        employeeRepository.save(employeeEntity);
        return employee;
    }

    @Override
    public List<Employee> getAllEmployees() {
        List<EmployeeEntity> employes=employeeRepository.findAll();
        List<Employee> employeeList=employes.stream().map(emp->new Employee(emp.getId(),emp.getFirstName(),emp.getLastName(),emp.getEmailId())).collect(Collectors.toList());
        return employeeList;
    }
    @Override
    public boolean deleteEmployee(Long id){
        EmployeeEntity employeeEntity=employeeRepository.findById(id).get();
        employeeRepository.delete(employeeEntity);
        return true;
    }
    @Override
    public Employee getEmployeeId(Long id){
        EmployeeEntity employeeEntity=employeeRepository.findById(id).get();
        Employee employee=new Employee();
        BeanUtils.copyProperties(employeeEntity,employee);
        return employee;
    }
    public Employee updateEmployee(Long id,Employee employee){
        EmployeeEntity employeeEntity=employeeRepository.findById(id).get();
        employeeEntity.setEmailId(employee.getEmailId());
        employeeEntity.setFirstName(employee.getFirstName());
        employeeEntity.setLastName(employee.getLastName());
        employeeRepository.save(employeeEntity);
        return employee;
    }
}
