package com.example.bhumika.jindal.academic_erp.Repositories;

import com.example.bhumika.jindal.academic_erp.Entities.Departments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Departments, Integer> {
}
