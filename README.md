# Fudy

### Test assignment for the role of Full Stack developer in Fudy company

### Company [LinkedIn](https://www.linkedin.com/company/fudy)

**Line of business:** European food delivery service. Alternative to Wolt and Bolt Food.

**Note:** At the moment, the company has ceased its activities.

## To run

1. Initial installation of packages for command center, client and server:
    ```
    npm run bootstrap
    ```

2. App startup:
     ```
     npm run app
     ```

### Note:
The app uses the following ports:
- `3000` - client
- `5500` - server
- `5432` - PostreSQL

which can be changed in the corresponding files

## Tech assignment specifications

### Create a service with endpoints:

* `POST /user` - creates a new user in database. Payload fields: `email` and `password`
* `POST /auth/login` - checks user credentials. If the credentials are correct, return a JWT token. Payload fields: `email` and `password`
* `GET /auth/me` - returns the current user

### Stack:

* Backend - NestJS
* Database - PostgreSQL

### Acceptance criteria:

* Swagger with correct models for all endpoints
* validation
* configuration in `.env` file and environment variables
* error handling

## Details of implementation

#### The client will be available on port `3000` if no other port is assigned and provides the following functionality:

- registering, logging in, logging out of the account
- navigating menu items
- view user information (the page is available only to the logged in user), i.e. access control to protected sections of the app
- displaying necessary notifications (for better UX and feedback on how the app works)
- handling of various server responses (for better UX and feedback on how the app works)
- session expiration
- integrated and configured a system for updating packages of different parts of the application

#### The backend part, respectively, will implement the same functionality.

- all requests on the server are validated for the expected data and in the expected format. In case of inconsistencies, a corresponding error is generated
- user data can be requested only with a valid token (i.e. only to a registered and logged in user)
- all APIs are documented with Swagger. The documentation is put in a separate file for better readability of the code base
- added checks and handling of various scenarious (double registration, presence of the requested user in the database, requesting a user with invalid token and so on)
- passwords are stored in the database in encrypted form (bcrypt)
- all critical data (database user password, database name, secret for JWT and so on) are stored in an `.env` file

## Stack

- Client - React.js, Typescript, Ant Design
- Server - Nest.js, Typescript, PostgreSQL, TypeORM, Swagger, Docker