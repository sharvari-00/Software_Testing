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
import com.example.bhumika.jindal.academic_erp.Repositories.DepartmentRepository;

import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@RestController
@RequestMapping("/api/department")
public class DepartmentLayer {

	@Autowired
	private DepartmentRepository departmentRepository;

	@PostMapping("/addDepartment")
	public ResponseEntity<Object> addDepartment(@RequestBody Departments newDepartment) {
		Departments addedDepartment = departmentRepository.save(newDepartment);
		List<Departments> allDepartments = departmentRepository.findAll();
		Map<String, Object> responseData = new LinkedHashMap<>();
		responseData.put("status", "OK");
		responseData.put("message", "Department added successfully");
		responseData.put("departments", allDepartments);
		responseData.put("new", addedDepartment);
		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

	@GetMapping("/getAllDepartment")
	public ResponseEntity<Object> getAllDepartment() {
		List<Departments> allDepartments = departmentRepository.findAll();
		Map<String, Object> responseData = new LinkedHashMap<>();
		responseData.put("status", "OK");
		responseData.put("departments", allDepartments);
		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

}
