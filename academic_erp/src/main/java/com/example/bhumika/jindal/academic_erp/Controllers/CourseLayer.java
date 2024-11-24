package com.example.bhumika.jindal.academic_erp.Controllers;

import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.bhumika.jindal.academic_erp.Entities.Courses;
import com.example.bhumika.jindal.academic_erp.Entities.Employees;
import com.example.bhumika.jindal.academic_erp.Repositories.CourseRepository;
import com.example.bhumika.jindal.academic_erp.Repositories.EmployeeRepository;

import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@RestController
@RequestMapping("/api/course")
public class CourseLayer {
	@Autowired
	private CourseRepository courseRepository;

	@Autowired
	private EmployeeRepository employeeRepository;

	private ResponseEntity<Object> createErrorResponse(HttpStatus status, String message) {
		Map<String, Object> errorResponse = new LinkedHashMap<>();
		errorResponse.put("status", "Error");
		errorResponse.put("message", message);
		return new ResponseEntity<>(errorResponse, status);
	}

	@PostMapping("/addCourse")
	public ResponseEntity<Object> addCourse(@RequestBody Courses newCourse) {
		try {
			if (newCourse.getFaculty() != null && newCourse.getFaculty().getEmployeeId() > 0) {
				Employees attachedEmployee = employeeRepository.findById(newCourse.getFaculty().getEmployeeId())
						.orElse(null);
				if (attachedEmployee == null) {
					return createErrorResponse(HttpStatus.BAD_REQUEST, "Faculty not found");
				}
				newCourse.setFaculty(attachedEmployee);
			}
			if (newCourse.getPrerequisites() != null) {
				Set<Courses> attachedPrerequisites = new HashSet<>();
				for (Courses prerequisite : newCourse.getPrerequisites()) {
					if (prerequisite.getId() > 0) {
						Courses attachedPrerequisite = courseRepository.findById(prerequisite.getId()).orElse(null);
						if (attachedPrerequisite != null) {
							attachedPrerequisites.add(attachedPrerequisite);
						} else {
							return createErrorResponse(HttpStatus.BAD_REQUEST, "Prerequisite not found");
						}
					} else {
						Courses savedPrerequisite = courseRepository.save(prerequisite);
						attachedPrerequisites.add(savedPrerequisite);
					}
				}
				newCourse.setPrerequisites(attachedPrerequisites);
			}
			Courses addedCourse = courseRepository.save(newCourse);
			List<Courses> allCourses = courseRepository.findAll();
			Map<String, Object> responseData = new LinkedHashMap<>();
			responseData.put("status", "OK");
			responseData.put("message", "Course added successfully");
			responseData.put("courses", allCourses);
			responseData.put("new", addedCourse);
			return new ResponseEntity<>(responseData, HttpStatus.OK);
		} catch (DataIntegrityViolationException e) {
			return createErrorResponse(HttpStatus.BAD_REQUEST, "A course with the same code or name already exists");
		} catch (Exception e) {
			return createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR,
					"An error occurred while processing the request");
		}
	}

	@GetMapping("/getAllCourse")
	public ResponseEntity<Object> getAllCourses() {
		List<Courses> allCourses = courseRepository.findAll();
		Map<String, Object> responseData = new LinkedHashMap<>();
		responseData.put("status", "OK");
		responseData.put("courses", allCourses);
		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

	@PutMapping("/updateCourse/{courseId}")
	public ResponseEntity<Object> updateCourse(@PathVariable int courseId, @RequestBody Courses updatedCourse,
			BindingResult bindingResult) {
		Courses existingCourse = courseRepository.findById(courseId).orElse(null);
		if (existingCourse == null) {
			Map<String, Object> errorResponse = new LinkedHashMap<>();
			errorResponse.put("status", "Error");
			errorResponse.put("message", "Course not found with ID: " + courseId);
			return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
		}
		Courses existingCourseByCode = courseRepository.findByCourseCode(updatedCourse.getCourseCode());
		if (existingCourseByCode != null && existingCourseByCode.getId() != courseId) {
			Map<String, Object> errorResponse = new LinkedHashMap<>();
			errorResponse.put("status", "Error");
			errorResponse.put("message",
					"Course with the given courseCode already exists. Choose a different courseCode.");
			return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
		}
		existingCourse.setCourseCode(updatedCourse.getCourseCode());
		existingCourse.setName(updatedCourse.getName());
		existingCourse.setDescription(updatedCourse.getDescription());
		existingCourse.setYear(updatedCourse.getYear());
		existingCourse.setTerm(updatedCourse.getTerm());
		existingCourse.setCredits(updatedCourse.getCredits());
		existingCourse.setCapacity(updatedCourse.getCapacity());
		if (updatedCourse.getFaculty() != null && updatedCourse.getFaculty().getEmployeeId() > 0) {
			Employees attachedEmployee = employeeRepository.findById(updatedCourse.getFaculty().getEmployeeId())
					.orElse(null);
			existingCourse.setFaculty(attachedEmployee);
		}
		Set<Courses> newPrerequisites = new HashSet<>();
		if (updatedCourse.getPrerequisites() != null) {
			for (Courses prerequisite : updatedCourse.getPrerequisites()) {
				if (prerequisite.getId() == courseId) {
					Map<String, Object> errorResponse = new LinkedHashMap<>();
					errorResponse.put("status", "Error");
					errorResponse.put("message", "Prerequisite cannot have the same ID as the course.");
					return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
				}
				Courses attachedPrerequisite;
				if (prerequisite.getId() > 0) {
					attachedPrerequisite = courseRepository.findById(prerequisite.getId()).orElse(null);
				} else {
					attachedPrerequisite = courseRepository.findByCourseCode(prerequisite.getCourseCode());
				}
				if (attachedPrerequisite != null) {
					newPrerequisites.add(attachedPrerequisite);
				}
			}
		}
		existingCourse.setPrerequisites(newPrerequisites);
		Courses updatedCourseResult = courseRepository.save(existingCourse);
		List<Courses> allCourses = courseRepository.findAll();
		Map<String, Object> responseData = new LinkedHashMap<>();
		responseData.put("status", "OK");
		responseData.put("message", "Course updated successfully");
		responseData.put("courses", allCourses);
		responseData.put("updated", updatedCourseResult);
		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

	@PostMapping("/deleteCourse/{courseId}")
	public ResponseEntity<Object> deleteCourse(@PathVariable int courseId) {
		Courses courseToDelete = courseRepository.findById(courseId).orElse(null);
		if (courseToDelete == null) {
			Map<String, Object> errorResponse = new LinkedHashMap<>();
			errorResponse.put("status", "Error");
			errorResponse.put("message", "Course not found with ID: " + courseId);
			return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
		}
		for (Courses otherCourse : courseRepository.findAll()) {
			otherCourse.getPrerequisites().remove(courseToDelete);
			courseRepository.save(otherCourse);
		}
		courseRepository.delete(courseToDelete);
		List<Courses> allCourses = courseRepository.findAll();
		Map<String, Object> responseData = new LinkedHashMap<>();
		responseData.put("status", "OK");
		responseData.put("message", "Course deleted successfully");
		responseData.put("courses", allCourses);
		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

}