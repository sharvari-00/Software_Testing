package com.example.bhumika.jindal.academic_erp.Repositories;

import com.example.bhumika.jindal.academic_erp.Entities.Courses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Courses, Integer> {
    Courses findByCourseCode(String courseCode);
}
