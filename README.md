# Bus Stops - Timetable Application

## Project Description

This web application was developed as part of a test assignment to display bus lines and stops using **Vue 3**. The application allows users to view available bus lines, select specific stops, and retrieve departure times. It was implemented based on specific user stories and design requirements, with a focus on accurate design replication, optimized user interaction, and enhanced data accessibility through sorting and filtering functionality.

## Key Technologies and Tools

- **Vue 3**: Used as the main framework for building user interface components.
- **Vue Router**: Handles navigation and page routing within the application.
- **Vuex**: Manages global state and data across the application.
- **TypeScript**: Ensures strong type safety, improves code readability, and reduces potential errors during development.
- **Axios**: Used for making HTTP requests to interact with the API server.
- **Bootstrap 5**: Provides styling and ensures responsive design.
- **Vitest**: A tool for writing and running unit tests to ensure code quality.
- **Json-server**: Simulates a backend server for API calls.

## Demonstrated Skills

This project showcases several key skills and practices:

- **Vue 3 Development**: Building components and organizing code using modern Vue patterns.
- **Vue Router and Vuex**: Implementing client-side routing and global state management for a seamless user experience.
- **Interactive UI**: Implementing real-time sorting and filtering for bus stops and timetable data.
- **TypeScript**: Enforcing type safety across the application to reduce errors and enhance maintainability.
- **API Integration**: Handling asynchronous data fetching and displaying real-time information on bus lines and stops.
- **Testing**: Writing unit tests to validate business logic and ensure components work as expected.
- **UI/UX Design**: Accurately following Figma design guidelines to create an accessible and user-friendly interface.

## Test Assignment Context

This project was completed as part of a technical test assignment, showcasing my ability to build a functional and well-structured application while adhering to the provided requirements. It highlights my proficiency in using Vue 3, TypeScript, and related technologies to meet specified goals under test conditions.


## Required environment
`npm 8.11` and `node 16.15`

## Installed packages ready to use
    "axios": "^0.27.2",
    "bootstrap": "^5.2.1",
    "core-js": "^3.8.3",
    "json-server": "^0.17.0",
    "vitest": "^1.2.0",
    "vue": "^3.2.13",
    "vue-router": "^4.0.3",
    "vuex": "^4.0.0"

`Font: Inter 400, 500, 600`

## Required open ports in environment
`8080` - for the Vue application <br/>
`3000` - for the API server

## How to start environment
1. `npm install` - install dependencies
2. `npm run api` - run the API
3. `npm run serve` - for the Vue application

## Assignment Overview
The task is to build a simple board for displaying bus stops according to provided User Stories and corresponding designs. The `docs` directory contains the `openapi` specification for the API responses. You can interact with the API and verify how it is implemented. The implementation should be as close to the design as possible, and TypeScript must be used. Loading and error states should be handled, and unit tests should be included. No additional libraries should be used.
