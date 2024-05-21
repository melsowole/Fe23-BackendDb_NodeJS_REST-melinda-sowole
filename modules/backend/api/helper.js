export function addStudentsToCourses(array) {
  const newArray = [];
  const courseIds = [];

  array.forEach((courseObj) => {
    const { course_id, name, description } = courseObj;
    const { student_id, fName, lName, town } = courseObj;

    if (!courseIds.includes(course_id)) {
      newArray.push({
        course_id,
        name,
        description,
        students: [],
      });
      courseIds.push(course_id);
    }
    if (student_id) {
      const course = newArray.find((c) => c.course_id == course_id);

      course.students.push(createStudentObj(student_id, fName, lName, town));
    }
  });

  return newArray;

  function createStudentObj(student_id, fName, lName, town) {
    return {
      student_id,
      fName,
      lName,
      town,
    };
  }
}

export function addCoursesToStudents(array) {
  const newArray = [];
  const studentIds = [];

  array.forEach((studentObj) => {
    const { student_id, fName, lName, town } = studentObj;
    const { course_id, name, description } = studentObj;

    if (!studentIds.includes(student_id)) {
      newArray.push({
        student_id,
        fName,
        lName,
        town,
        courses: [],
      });
      studentIds.push(student_id);
    }

    if (course_id) {
      const student = newArray.find((s) => s.student_id == student_id);

      student.courses.push(createCourseObj(course_id, name, description));
    }
  });

  return newArray;
}

function createStudentObj(student_id, fName, lName, town) {
  return {
    student_id,
    fName,
    lName,
    town,
  };
}
function createCourseObj(course_id, name, description) {
  return {
    course_id,
    name,
    description,
  };
}
