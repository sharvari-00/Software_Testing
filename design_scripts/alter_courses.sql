-- Add foreign key constraint for employee_id in course table
ALTER TABLE course
ADD CONSTRAINT fk_employee_id
FOREIGN KEY (employee_id)
REFERENCES employees(employee_id);

-- Add foreign key constraint for course_id in course_prerequisite table
ALTER TABLE course_prerequisite
ADD CONSTRAINT fk_course_id
FOREIGN KEY (course_id)
REFERENCES course(course_id);

-- Add foreign key constraint for prerequisite_course_id in course_prerequisite table with ON DELETE CASCADE
ALTER TABLE course_prerequisite
ADD CONSTRAINT fk_prerequisite_course_id
FOREIGN KEY (prerequisite_course_id)
REFERENCES course(course_id)
ON DELETE CASCADE;

-- Add composite foreign key constraint for course_id and prerequisite_course_id in course_prerequisite table with ON DELETE CASCADE
ALTER TABLE course_prerequisite
ADD CONSTRAINT fk_composite_key
FOREIGN KEY (course_id, prerequisite_course_id)
REFERENCES course(course_id, course_id)
ON DELETE CASCADE;

-- Add foreign key constraint for department_id in employees table
ALTER TABLE employees
ADD CONSTRAINT fk_department_id
FOREIGN KEY (department_id)
REFERENCES departments(department_id);

