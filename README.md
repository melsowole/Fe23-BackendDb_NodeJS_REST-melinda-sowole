# Grit Academy

# Opening the project

1. **Clone the project**
2. **Set up the MySQL Database** following the instructions further down in the document.
3. **Open the project in a code editor** and access an instance of the integrated terminal.
4. **Start the application:** In the integrated terminal, run the following command to start the application

```
npm run start
```

5. **Access the application:** Once the application is running, you can access it through your web browser at `http://localhost:3000`

# Setting up the MySQL Database

1. **Start your MySQL server:** Use your preferred local server environment like MAMP, WAMP, or XAMPP to start the MySQL sevrer.
2. **Access MySQL:** Open your command line or terminal and navigate to your MySQL installation directory. For example, you might use:

```sql
 -> cd ../../../mamp/bin/mysql/bin
```

3. **Log in to MySQL:** Use the command

```sql
-> mysql -u [your_username] -p
```

- If you haven't set up a username and password, you can often use the default credentials, which are typically 'root' for both username and password.

4. **Create the database:** Once logged in, run the following SQL commands to create the necessary database, tables and initial data:

```sql
CREATE DATABASE GritAcademy;

USE GritAcademy;

CREATE TABLE students(
  student_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  fName VARCHAR(255) NOT NULL,
  lName VARCHAR(255) NOT NULL,
  town VARCHAR(255)
);

CREATE TABLE courses(
  course_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE students_courses(
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  student_id BIGINT NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  course_id BIGINT NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

INSERT INTO students (fName, lName, town)
VALUES
  ('Gregory', 'House', 'Princeton'),
  ('James', 'Wilson', 'Princeton'),
  ('Lisa', 'Cuddy', 'Princeton'),
  ('Eric', 'Foreman', 'Newark'),
  ('Allison', 'Cameron', 'Chicago'),
  ('Robert', 'Chase', 'Melbourne'),
  ('Remy', 'Hadley', 'Princeton'),
  ('Chris', 'Taub', 'Trenton'),
  ('Lawrence', 'Kutner', 'San Francisco'),
  ('Stacy', 'Warner', 'Princeton'),
  ('Amber', 'Volakis', 'Princeton'),
  ('Lucas', 'Douglas', 'Princeton'),
  ('Michael', 'Tritter', 'New York'),
  ('Martha', 'Masters', 'Boston'),
  ('Edward', 'Vogler', 'Princeton');

INSERT INTO courses (name, description)
VALUES
  ('Biology 101', 'Introduction to Biology'),
  ('Chemistry 101', 'Basics of Chemistry'),
  ('Physics 101', 'Fundamentals of Physics'),
  ('Anatomy 201', 'Human Anatomy and Physiology'),
  ('Pharmacology 301', 'Introduction to Pharmacology'),
  ('Pathology 401', 'Advanced Pathology'),
  ('Medical Ethics', 'Ethical Issues in Medicine'),
  ('Psychology 101', 'Introduction to Psychology');

INSERT INTO students_courses (student_id, course_id)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5),
  (6, 6),
  (7, 7),
  (8, 8),
  (9, 1),
  (10, 2),
  (11, 3),
  (12, 4),
  (13, 5),
  (14, 6),
  (15, 7),
  (1, 2),
  (2, 3),
  (3, 4),
  (4, 5),
  (5, 6),
  (6, 7),
  (7, 8),
  (8, 1),
  (9, 2),
  (10, 3),
  (11, 4),
  (12, 5),
  (13, 6),
  (14, 7),
  (15, 8);

```
