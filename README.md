# Hospital API

## Introduction
This project aims to provide an API for managing the interaction between doctors and patients in a hospital setting, specifically focusing on the testing, quarantine, and well-being of COVID-19 patients. The API is designed using Node.js and MongoDB, ensuring scalability and flexibility.

## Features
- **User Types**: The system accommodates two types of users: doctors and patients.
- **User Authentication**: Doctors can log in securely to access the system functionalities.
- **Patient Registration**: Doctors can register patients using their phone numbers. If a patient already exists, their information is retrieved.
- **Report Creation**: After a checkup, doctors can create reports for patients, specifying status (e.g., Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit) and date.
- **Report Listing**: The API provides routes to list all reports of a patient and all reports filtered by status.

## Tech Stack
- **Node.js**: Server-side runtime environment.
- **MongoDB**: NoSQL database for storing data.
- **JWT Authentication**: Secure authentication mechanism for user login.

## Setup
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up MongoDB database and configure connection in `config.js`.
4. Start the server using `npm start`.

HOSPITAL-API
|           |               
|           |               |
|           |--->config---> |-->mongodbConnect.js
|           |               |
|           |
|--->src--->|               |            |-->doctor.controller.js   
|           |               |-->doctor-->|-->doctor.routes.js
|           |               |            |-->doctor.repository.js  
|           |--->core-----> |            |-->doctorSchema.js  
|           |               |
|           |               |            |-->patent.controller.js
|           |               |-->patent-->|-->patent.routes.js
|           |               |            |-->patent.repository.js
|           |               |            |-->patentSchema.js
|           |               |
|           |               |            |-->report.controller.js
|           |               |-->report-->|-->report.routes.js
|           |               |            |-->report.repository.js
|           |               |            |-->reportSchema.js
|           |               |            
|           |               |                                                                                          
|           |               |
|           |
|           |-->middleware-->|-->jwtAuth.middleware.js
|           |
|           |
|
|
|-->server.js
|-->package.json
|-->package.lock.json
|-->node_module
|-->.env
|-->README.md
|
