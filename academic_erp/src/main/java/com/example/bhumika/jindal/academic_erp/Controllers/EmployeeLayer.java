package com.example.bhumika.jindal.academic_erp.Controllers;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.bhumika.jindal.academic_erp.Entities.Departments;
import com.example.bhumika.jindal.academic_erp.Entities.Employees;
import com.example.bhumika.jindal.academic_erp.Repositories.DepartmentRepository;
import com.example.bhumika.jindal.academic_erp.Repositories.EmployeeRepository;

import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@RestController
@RequestMapping("/api/employee")
public class EmployeeLayer {

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private DepartmentRepository departmentRepository;

	@PostMapping("/addEmployee")
	public ResponseEntity<Object> addEmployee(@RequestBody Employees newEmployee) {
		if (newEmployee.getDepartment() != null && newEmployee.getDepartment().getDepartmentId() > 0) {
			Departments attachedDepartment = departmentRepository
					.findById(newEmployee.getDepartment().getDepartmentId())
					.orElse(null);
			newEmployee.setDepartment(attachedDepartment);
		}
		Employees addedEmployee = employeeRepository.save(newEmployee);
		List<Employees> allEmployees = employeeRepository.findAll();
		Map<String, Object> responseData = new LinkedHashMap<>();
		responseData.put("status", "OK");
		responseData.put("message", "Employee added successfully");
		responseData.put("employees", allEmployees);
		responseData.put("new", addedEmployee);
		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

	@GetMapping("/getAllFaculty")
	public ResponseEntity<Object> getAllFaculty() {
		List<Employees> allFaculty = employeeRepository.findAll();
		Map<String, Object> responseData = new LinkedHashMap<>();
		responseData.put("status", "OK");
		responseData.put("employees", allFaculty);
		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}
}
