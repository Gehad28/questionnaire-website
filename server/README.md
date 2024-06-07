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
