# School Management CRM (Front and back end)

## Overview

The School Management CRM is a web application designed to streamline the administration and management of schools. This project provides functionalities for managing classes, teachers, and students, along with analytics features to track performance and financials.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Class Management**: Add, edit, and delete classes. Assign teachers to classes.
- **Teacher Management**: Manage teacher details, including their contact information and salaries.
- **Student Management**: Add, edit, and delete student information. Assign students to classes.
- **Analytics**: View class performance metrics such as the number of students and total fees collected.
- **Search and Sort**: Search for teachers and students, with sorting capabilities.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Charting**: Chart.js for analytics visualization

## Installation

To set up the project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/username/repository-name.git
   cd repository-name
   ```

2. **Install Dependencies**:
   For the backend:
   ```bash
   cd server
   npm install
   ```
   For the frontend:
   ```bash
   cd client
   npm install
   ```

3. **Run the Server**:
   Navigate to the server directory and start the backend server:
   ```bash
   npm start
   ```

4. **Run the Client**:
   Navigate to the client directory and start the frontend:
   ```bash
   npm start
   ```

## Usage

Once the server and client are running, you can access the application at `http://localhost:3000`.

## API Endpoints

### Classes

- `GET /classes`: Fetch all classes.
- `POST /class`: Add a new class.
- `DELETE /class/:id`: Delete a class.

### Teachers

- `GET /teachers`: Fetch all teachers.
- `POST /teacher`: Add a new teacher.
- `DELETE /teacher/:id`: Delete a teacher.

### Students

- `GET /students`: Fetch all students.
- `POST /student`: Add a new student.
- `DELETE /student/:id`: Delete a student.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License.
