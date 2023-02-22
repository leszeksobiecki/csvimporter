# csvimporter

The goal of the project is to import a CSV file into H2 database and show persisted data in the user interface.

[React](https://reactjs.org/) is in the frontend and [Spring Boot](https://spring.io/) + H2 database are in the backend.

## How to run it?
Pre-requisites:
- Apache Maven ([installation instruction for Windows](https://mkyong.com/maven/how-to-install-maven-in-windows/))
- [Node.js](https://nodejs.org/en/download/)

Open a terminal window, switch to the project directory and run:
```
./mvnw spring-boot:run
```
The command should start the backend server. Please, check under http://localhost:8080/ if it responds (you should see a test application).

Open a separate terminal window, switch to the project subdirectory "frontend" and run:
```
npm start
```
It should start the frontend page under http://localhost:3000/. 

Please, use this page to upload your CSV file, persist it in H2 database and show its content in the table.

### Assumptions:
- CSV file contains a header: Name;Email;PhoneNumber
- semicolon (;) is used a separator - here is a [sample file](employees.csv)

