# Student-Management-Project

## Introduction

I made this project for a my end of year coursework for my second year at Liverpool Hope University.

The technology stack used in the conception and creation of this website have been chosen based on the usability, scope of the project, the time to market, security, and relevance in the market. The technology stack chosen was the MEVN(MongoDB, Express, Vue Js, Nodejs) stack. MEVN is powerful JavaScript software stack. It is a relatively new but can be used to efficiently build front-end components and easier database scalability and management due to NoSQL. The back-end API is based on a hybrid REST + GraphQL model. This was specifically chosen due to the security of the REST API and the ability to avoid over-fetching, the process of requesting more information that is required by the frontend, with GraphQL.

The website’s UI & UX has been specifically designed around the requirements for this client. Thus, ensuring the user experience is extremely smooth and effortless. All major actions such as checking course grades/statistics are easily accessible on the sidebar. Vue Js enables the developer to reuse components with ease thus eliminating the need to recreate similar sections on the website. If used to its maximum potential Vue Js enables data caching and tremendously increases website load speeds. Compared to PHP based architecture Vue Js can respond to user actions in the browser and is lighter which enables it to be faster which is what SEO ranking algorithms consider currently. Meta tags are not as important as website load speeds and accessibility which Vue Js’s excels at.

The website’s back-end uses a hybrid REST API + GraphQL model. The REST API enables security measures such as setting JWTs(Java Web Tokens) which are used to identify and authenticate a user’s identity on the website. GraphQL prevents over-fetching data by requesting only the feels specified by the developer. This is an issue with a standalone REST API as it fetches the entire data payload without any filters which results to over-fetching, especially when multiple collections and documents are required.*

\* Blurb above has been taken directly from my coursework submission.

## Screenshots 
### Landing Page
![Landing Page](screenshots/01_Landing.jpg)

### Landing Page Section 2
![Landing Page Section 2](screenshots/02_Landing.jpg)

### Login 
![Login Page](screenshots/03_Login.jpg)

### Register
![Register Page](screenshots/04_Register.jpg)

### Student Dashboard
![Student Dashboard](screenshots/05_StudentDashboard.jpg)

### Student Grades
![Student Grades](screenshots/06_StudentGrades.jpg)

### Student Course
![Student Course](screenshots/07_StudentCourse.jpg)

### Student Quiz
![Student Quiz](screenshots/08_StudentQuiz.jpg)

### Staff Dashboard
![Staff Dashboard](screenshots/09_StaffDashboard.jpg)

### Staff Manage Page
![Staff Manage Page](screenshots/10_StaffManage.jpg)

### Staff Tutor Approval Widget
![Staff Tutor Approval Widget](screenshots/11_StaffManageTutorApproveWidget.jpg)

### Staff Course
![Staff Course](screenshots/12_StaffCourse.jpg)

### Staff Course Approval Widget
![Staff Course Approve](screenshots/13_StaffCourseApprove.jpg)

### Staff Quiz Upload Widget
![Staff Quiz Upload](screenshots/14_StaffUploadQuiz.jpg)

### Staff Grades Overview 
![Staff Grades Overview ](screenshots/15_StaffGrades.jpg)

### Staff Individual Grade View
![Staff Individual Grade View](screenshots/16_StaffGradesIndividual.jpg)

### Staff Enrol students from a master list
![Staff Enrol students from a master list](screenshots/17_EnrolFromList.jpg)
