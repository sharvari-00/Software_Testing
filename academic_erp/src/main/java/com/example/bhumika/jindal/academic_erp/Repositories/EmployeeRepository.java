package com.example.bhumika.jindal.academic_erp.Repositories;

import com.example.bhumika.jindal.academic_erp.Entities.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employees, Integer> {
}
