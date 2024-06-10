# Project Setup Guide

This guide provides steps to set up your project.

## Installation

1. Navigate to the server directory:
    ```bash
    cd server
    ```

2. Initialize npm project:
    ```bash
    npm init -y
    ```

3. Install Prisma, TypeScript, ts-node, and @types/node as dev dependencies:
    ```bash
    npm install prisma typescript ts-node @types/node --save-dev
    ```

4. Initialize TypeScript configuration:
    ```bash
    npx tsc --init
    ```

5. Initialize Prisma:
    ```bash
    npx prisma
    ```

6. Initialize Prisma project:
    ```bash
    npx prisma init
    ```

7. Create a migration (replace 'migration-name' with your desired migration name):
    ```bash
    npx prisma migrate dev --name migration-name
    ```

8. Install Express:
    ```bash
    npm install express
    ```

9. Install TypeScript definitions for Express:
    ```bash
    npm install @types/express --save-dev
    ```

## Usage

1. Run the TypeScript application:
    ```bash
    ts-node src/app
    ```


## API Documentation

### 1. Create a User

- **Endpoint:**
    ```
    POST http://localhost:10000/user/
    ```
- **Request Body:**
    ```json
    {
      "firstName": "sara",
      "lastName": "ahmed"
    }
    ```
- **Response:**
    ```json
    {
      "userId": 1
    }
    ```

### 2. Post Answers

- **Endpoint:**
    ```
    POST http://localhost:10000/question/
    ```
- **Request Body:**
    ```json
    {
      "userId": 1,
      "answers": [
        { "id": 1, "response": 2, "dimension": "FA" },
        { "id": 2, "response": 4, "dimension": "FA" },
        { "id": 3, "response": 3, "dimension": "FA" },
        { "id": 4, "response": 5, "dimension": "FA" },
        { "id": 5, "response": 1, "dimension": "FA" },
        { "id": 6, "response": 4, "dimension": "FA" },
        { "id": 7, "response": 3, "dimension": "FA" },
        { "id": 1, "response": 4, "dimension": "PU" },
        { "id": 2, "response": 3, "dimension": "PU" },
        { "id": 3, "response": 5, "dimension": "PU" },
        { "id": 4, "response": 1, "dimension": "PU" },
        { "id": 5, "response": 4, "dimension": "PU" },
        { "id": 6, "response": 3, "dimension": "PU" },
        { "id": 7, "response": 2, "dimension": "PU" },
        { "id": 8, "response": 4, "dimension": "PU" },
        { "id": 1, "response": 2, "dimension": "AE" },
        { "id": 2, "response": 4, "dimension": "AE" },
        { "id": 3, "response": 3, "dimension": "AE" },
        { "id": 4, "response": 5, "dimension": "AE" },
        { "id": 5, "response": 1, "dimension": "AE" },
        { "id": 1, "response": 4, "dimension": "RW" },
        { "id": 2, "response": 3, "dimension": "RW" },
        { "id": 3, "response": 5, "dimension": "RW" },
        { "id": 4, "response": 1, "dimension": "RW" },
        { "id": 5, "response": 4, "dimension": "RW" },
        { "id": 6, "response": 3, "dimension": "RW" },
        { "id": 7, "response": 2, "dimension": "RW" },
        { "id": 8, "response": 4, "dimension": "RW" },
        { "id": 9, "response": 2, "dimension": "RW" },
        { "id": 10, "response": 1, "dimension": "RW" }
      ]
    }
    ```
- **Response:**
    ```json
    {
      "message": "Answers saved successfully"
    }
    ```

### 3. Calculate Score

- **Endpoint:**
    ```
    GET http://localhost:10000/question/score/:userId
    ```
    `:userId` is a placeholder for the user's unique ID.

- **Response:**
    ```json
    {
      "message": "Answers saved successfully",
      "dimensionAverages": {
        "FA": 3.142857142857143,
        "PU": 3.25,
        "AE": 3,
        "RW": 2.9
      },
      "totalDimensionAverage": 12.292857142857143
    }
    ```
    The score that we need is `totalDimensionAverage`