# User Task Management System

# Overview

- This is a simple User Task Management API that allows users to manage their tasks efficiently.
- Users can add new tasks, including details like task name, description, and deadline.
- Users can update existing task details as needed.
- Users can delete tasks that are no longer relevant.
- The API also allows users to fetch and view all available tasks from the database.
- Task management is streamlined with CRUD (Create, Read, Update, Delete) operations.
- The API is designed to ensure data integrity and provide an easy-to-use interface for managing user tasks.

# Architecture

   <img src="./assets/architecture.png" alt="architecture" >

- Here's a brief explanation of the diagram and the flow it represents for the high-level architecture of a backend system. The diagram primarily illustrates how HTTP requests are handled within a Node.js backend application, moving through various layers. Let's break it down step-by-step:

- **1. Client Requests**

- Description: The client (could be a browser, a mobile app, or any external service) sends HTTP requests to your server to perform certain operations, such as adding, retrieving, or updating tasks.

- Example Requests in the Diagram:
  **POST** `/api/v1/addTask` - Adds a new task.

  **GET** `/api/v1/getAllTasks` - Retrieves all tasks.

  **PUT** `/api/v1/updateTask/:taskid` - Updates an existing task using a task ID.

  **DEL** `/api/v1/deleteTask/:taskId` - deleting an existing task using a task ID.

  **PATCH** `/api/v1/task/:taskId` - updating a specific field of a task using a task ID.

- **2. Router Middlewares**
- Description: This is the first layer responsible for handling routing logic. Router middlewares intercept requests that have a specific URL prefix.

- Example: Requests with the prefix `/api/v1/` may be handled by one middleware, while requests with the prefix `/api/v1/auth` can be processed by another middleware, each invoking the appropriate routers.

- Purpose: It determines which router function should handle the incoming request, enabling efficient routing and separation of concerns for different request paths.

  ```
  app.use("/api/v1", taskRouter());
  app.use("/api/v1/auth", authRouter());

  ```

  - The above two of them are router middewares. They will intercept the request and invoke the appropriate router.

  - From above, the first middleware will intercept the requests that have prefix `/api/v1` and invoke taskRouter.

  - Second one will intercept requests have prefix `/api/v1/auth` and invoke authRouter.

- **3. Router**
- Description: The routing layer is responsible for directing the requests to the appropriate controllers based on the request path and method.

- Purpose: It helps organize and structure the API endpoints, making it easy to manage different routes for tasks, users, or other entities.

- A router has multiple child routes like below one.

  ```
  // add router
      router.post("/addTask", verifyJwtMiddleWare, (req, res) =>
        taskController.addUserTask(req, res)
      );

      // all task router
      router.get("/getAllTasks", verifyJwtMiddleWare, (req, res) =>
        taskController.getAllTasks(req, res)
      );

      // get user task by id
      router.get("/userTask/:taskId", verifyJwtMiddleWare, (req, res) =>
        taskController.getTaskById(req, res)
      );

      // update the task router
      router.put("/updateTask/:taskId", verifyJwtMiddleWare, (req, res) =>
        taskController.updateTask(req, res)
      );

      // delete a particular health care service
      router.delete("/deleteTask/:taskId", verifyJwtMiddleWare, (req, res) =>
        taskController.deleteTask(req, res)
      );

      // marking user task as completed
      router.patch("/task/:taskId", verifyJwtMiddleWare, (req, res) =>
        taskController.updateTaskStatus(req, res)
      );

  ```

- **4. JWT Middleware**

  - Description: This middleware handles JSON Web Token (JWT) validation for authentication and authorization purposes. If the request requires user authentication, the JWT middleware ensures that the token provided by the client is valid and grants access based on the user's permissions.

  - Purpose: It adds a security layer, preventing unauthorized access to protected routes.
    Flow Example: If a request is made to access a protected route, the JWT middleware verifies the token. If valid, the request moves forward; otherwise, it may be blocked.

- **5. Controller**

- Description: The controller layer handles the business logic for incoming requests. It receives data from the client (request body, parameters, etc.) and orchestrates the necessary operations, often calling the appropriate services to perform actions like data retrieval, updates, or deletions.

- Purpose: Controllers serve as an intermediary between the incoming request and the business logic or services layer, helping keep the logic clean and manageable.

- Example: When the controller receives a request to addTask, it may validate the input data and then pass it to the service layer for further processing.

**6. Service**

- Description: The service layer contains the core business logic of the application. This is where the main operations and transformations on data happen. It interacts with the database layer to fetch or modify data as needed.

- Purpose: Services ensure that controllers remain thin by handling complex operations here, following a separation of concerns.

- Example: The service may handle operations like creating a new task, fetching tasks based on certain criteria, or updating an existing task.

**7. Database**

- Description: This is the storage layer where the application’s data resides. It could be any database like MongoDB, PostgreSQL, etc.

P- urpose: It stores and manages the application's data, providing CRUD (Create, Read, Update, Delete) operations through queries or ORM (Object-Relational Mapping) tools.
Flow Example: When a request to addTask is processed by the service layer, it interacts with the database to persist the task data.

- **Flow Summary**

- The client sends an HTTP request (e.g., POST /api/v1/addTask).
- The router middleware handles the request and routes it to the correct endpoint.
- If necessary, the JWT middleware validates the request’s token for security.
- The controller receives the request and performs any necessary data validation or preprocessing.
- The controller calls the appropriate service function to execute business logic.
- The service interacts with the database to retrieve or modify data.
- The response flows back through each layer to the client.

# Set up and Installation

- Initiate the node application using `npm init`

- and then install following dependencies

```
 dependencies": {
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.8.1"
  }
```

- **dotenv**: This package is used for loading environment variables from a `.env` file into `process.env` in a Node.js application. It helps manage sensitive information like API keys, database URIs, and other configuration values securely without hardcoding them into the application code.

- **express**: Express is a fast, unopinionated, minimalist web framework for Node.js. It is used for building web applications and APIs. Express provides a robust set of features to develop web and mobile applications, such as routing, middleware support, and template rendering.

- **mongoose**: Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and offers a straightforward query API for interacting with MongoDB. Mongoose is particularly useful for defining models and handling database operations in a structured manner.

- **bcryptjs**: This library is used for hashing and comparing passwords, providing secure user authentication by hashing passwords before storing them in the database.

- **jsonwebtoken**: It allows the creation and verification of JSON Web Tokens (JWTs) for securely transmitting information between parties, often used for user authentication and authorization in web applications.

### Establishing Data Base Connection

- Before we start the server, we've to connect our db.

```
const mongoose = require("mongoose");

const connectDB = async () => {
  const dbURI = process.env.dbURI;
  try {
    await mongoose.connect(dbURI);
    console.log("Database connected");
    return mongoose.connection.db; // Return the database connection
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

module.exports = connectDB;

```

### Start the server

After establishing the connection to our database then we can start our server.

```
const startServer = async () => {
  const PORT = process.env.PORT;
  try {
    await connectDB();

    // router middlewares
    app.use("/api/v1", taskRouter());
    app.use("/api/v1/auth", authRouter());

    // server listening
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}
```

# Models

## User Schema

- To store user data in the database, we need a well-defined schema. Each user has fields such as `userName`, `password`, and `emailId` to capture essential information.
- This user schema ensures that the data being registered and managed adheres to the correct structure, enabling consistency and integrity in the database.
- By defining the user schema, we can easily validate and handle user data before storing it in the database, which is crucial for registration and other user management operations.

- **User Schema**

  ```
  const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  passWord: { type: String, required: true },
  emailId: { type: String, required: true },
  });
  ```

## User Task Schema

- To add a new task to the database, we need a well-defined schema. A task typically consists of fields such as `taskName`, `taskDescription`, and `taskDue` to capture the key details of each task.

- task could've also had `taskCreatedAt`, `taskUpdatedAt`, `taskStatus`. But user don't need to provide these data. These data is automatically, handled by backend program.

- This schema ensures that all tasks adhere to a structured format, providing consistency and making data management easier.

- By using a task schema, we can validate task data before adding it to the database, ensuring data accuracy and completeness for every task created. This structure also facilitates easier retrieval, updating, and management of tasks.

```
const userTaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  taskDescription: { type: String, required: true },
  taskDue: { type: String, required: true },
  taskCreatedAt: { type: String, default: getFormatedDate() },
  taskUpdatedAt: { type: String, default: "" },
  taskStatus: { type: String, default: "Pending" },
});
```

# Assumptions

- When a task is created, I assume its initial status is set to `Pending` by default, as it has not been completed yet and still requires action. This default status ensures clarity on the task's current state.

- If a user updates an existing task, I consider the task to be `In Progress` indicating that work is ongoing and the task is actively being worked on.

- When a user sends a `PATCH` request marking the task as completed, the status transitions to `Completed` signifying that the task has been successfully finished.

- When a user makes an update request, the taskStatus field is changed to `In Progress`. Additionally, the taskUpdatedAt field is set to the current timestamp, with its initial value being empty until an update occurs.

- When a user creates a new task, the taskCreatedAt field is automatically filled with the current date and time by default.

# API Usage

- User has to register before doing any crud operations.
- If user sucessfully registerd, user will get jwt token. So, that user can access
  different resources of an application.

### User Registeration

- **Endpoint** : `/api/v1/register`

- **Request Method** : `POST`

- **Request Body** :

  ```
    {
    "userName",
    "emailId" ,
    "passWord",
    }
  ```

**Example Request**

- **Example Request Body** :

  ```

   {
   "userName" : "Jon Snow",
   "emailId" : "snow@gmail.com",
   "passWord" : "house stark"
   }

  ```

   <img src="./assets/authRegisterRequest.PNG" alt="authRegisterRequest" >

**Expected Response**

- **Status**: 200 OK

- **Response Body**:

  ```
    {
    "message": "user is register successfully.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzlkMzg2NzhlNjNhNjczOWVkMTM0ZiIsImlhdCI6MTczMTg0Mjk1MCwiZXhwIjoxNzMxODQ2NTUwfQ.r5mIZf81IkUwfHzT1MJn5PJ7bgiuTp09nwzQNqtObTQ"
    }
  ```

- **Response**:

    <img src="./assets/authRegisterResponse.PNG" alt="authRegisterResponse" >

### User Login

- User will also get jwt token when user logged in.

  **Endpoint**: `/api/v1/login`

  **Request Method** : `POST`

  **Request Body** :

  ```
  {
  "emailId" ,
  "passWord",
  }
  ```

**Example Request**

- **Example Request Body** :

  ```

   {
   "emailId" : "snow@gmail.com",
   "passWord" : "house stark"
   }

  ```

   <img src="./assets/authLoginRequest.PNG" alt="authLoginRequest" >

**Expected Response**

- **Status**: 200 OK

- **Response Body**:

  ```
    {
    "message": "User Logged in Successully.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzlkMzg2NzhlNjNhNjczOWVkMTM0ZiIsImlhdCI6MTczMTg0Mjk1MCwiZXhwIjoxNzMxODQ2NTUwfQ.r5mIZf81IkUwfHzT1MJn5PJ7bgiuTp09nwzQNqtObTQ"
    }
  ```

- **Response**:

    <img src="./assets/authLoginResponse.PNG" alt="Add Service response" >

## NOTE

- To perform any CRUD operation, the user must include a valid JWT token in the request's authorization headers. If no token is provided, the request will result in a "NO TOKEN FOUND" error response.
- Users receive a JWT token upon registering or logging in, which serves as a means of authenticating subsequent requests.
- If the token is modified, tampered with, or deemed invalid, an appropriate error message will be returned, and the request will be rejected.
- Therefore, before making any CRUD operation requests, ensure that you are sending a valid token in the authorization headers for successful access and operation.

### Example

- Let's make a crud request without sending jwt token.
- If user tries to delete a task without jwt token

- **Request**
  <img src="./assets/deleteTaskRequest.PNG" alt="deleteTaskRequest" >

- **Response**

  <img src="./assets/tokenNotFound.PNG" alt="tokenNotFound" >

- To make it work, user has to include token

  <img src="./assets/includeToken.PNG" alt="includeToken" >

- **Response**
  <img src="./assets/includeTokenResponse.PNG" alt="includeTokenResponse" >

## CRUD Endpoints

### 1) Add User Task

**Endpoint**: `/api/v1/addTask`

**Request Method** : `POST`

**Description**:

- This endpoint allows users to add new tasks to the database. Users can specify details such as the task name, a description of the service, and its due data. Once posted, the data is stored for further operations like updating, fetching, or deleting services. This feature enables easy management and tracking of user tasks offerings within the system.

**Request Body** :

```

 {
 "taskName",
 "taskDescription" ,
 "taskDue",
 }

```

**Request Headers** :

- User can only make addTask requerst if user is logged in. So, if user is logged in, then
  user has to make request along with jwt token

**Example Request**

- **Example Request Body** :

  ```

   {
     "taskName" : "Convert monolith to Microsevices",
    "taskDescription" : "converting a monolith application into multiple services",
    "taskDue" : "30/Nov/2024"
   }

  ```

   <img src="./assets/addTaskRequest.PNG" alt="addTaskRequest" >

**Expected Response**

- **Status**: 200 OK

- **Response Body**:

  ```
    {
        "message": "New task has been successfully added."
    }
  ```

- **Response**:

    <img src="./assets/addTaskResponse.PNG" alt="addTaskResponse" >

### 2) Get All User Tasks

**Endpoint**: `/api/v1/getAllTasks`

**Request Method** : `GET`

**Description**:

- This endpoint retrieves all user tasks stored in the database. It provides users with an overview of all tasks, including their names, descriptions, and due dates.

**Example Request**

   <img src="./assets/getAllTaskRequest.PNG" alt="getAllTaskRequest" >

**Expected Response**

- **Status**: 200 OK

- **Response Body**:

  ```
           {
        "_id": "6739e7ff912af9e4249cbab8",
        "taskName": "Convert monolith to Microsevices",
        "taskDescription": "converting a monolith application into multiple services",
        "taskDue": "30/Nov/2024",
        "taskCreatedAt": "2024-11-17 17:39:36",
        "taskUpdatedAt": "",
        "taskStatus": "Pending",
        "__v": 0
    }
  ```

- **Response**:

    <img src="./assets/getAllTaskResponse.PNG" alt="getAllTaskResponse" >

### 3) Get User Task By TaskId

**Endpoint**: `/api/v1/userTask/:taskId`

**Request Method** : `GET`

**Description**:

- This endpoint retrieves specific user task stored in the database. It provides users with an overview of tasks, including their names, descriptions, and due dates.

**Example Request**

- **Response Params**:

  ```
    {taskId : "673998e360d8b409bb1b7ab6"}
  ```

   <img src="./assets/getTaskByIdRequest.PNG" alt="getTaskByIdRequest" >

**Expected Response**

- **Status**: 200 OK

- **Response Body**:

  ```
         {
        "_id": "6739d2a61415522d04038aed",
        "taskName": "Complete REST API",
        "taskDescription": "implement API endpoints for login ang register.",
        "taskTitle": "Don't know",
        "taskDue": "13/04/2029",
        "taskCreatedAt": "2024-11-17 16:41:59",
        "taskUpdatedAt": "2024-11-17 17:37:02",
        "taskStatus": "Completed",
        "__v": 0
    }
  ```

- **Response**:

    <img src="./assets/getTaskByIdResponse.PNG" alt="getTaskByIdResponse" >

### 4) Update User Task

**Endpoint**: `/api/v1//updateTask/:taskId`

**Request Method** : `PUT`

- **Request Body**

  ```
  {
  "taskName" ,
  "taskDescription" ,
  "taskDue",
  }

  ```

  **Description**:

- This endpoint allows users to update the details of an existing user task. The request must include the unique `taskId` in url to identify which task should be modified. Additionally, it accepts fields that the user wants to update, such as the `task name`, `task description`, or `task due date`. Upon successful completion of the update, a success message is returned, confirming that the task data has been modified. This feature ensures that user task information remains current and accurate.
- `taskId` must be included to identify which record needs to be deleted.
- `taskId` is generated by mongoDB, when we are adding a new service.

**Example Request**

   <img src="./assets/updateTaskRequest.PNG" alt="updateTaskRequest" >

- **Example Request Body**

  ```
  {
  "taskName": "Complete REST API",
  "taskDescription": "implement API endpoints for login ang register.",
  "taskDue": "13/04/2029"
  }

  ```

**Expected Response**

- **Status**: 200 OK

- **Response Body**:

  ```
  {
      "message": "Complete REST API has been successfully updated."
  }
  ```

  - **Response**:

      <img src="./assets/updateTaskResponse.PNG" alt="updateTaskResponse" >

### 5) Update User Task Status

**Endpoint**: `/api/v1//updateTask/:taskId`

**Request Method** : `PATCH`

- **Request Body**

  ```
  {
  "taskStatus" ,
  }

  ```

  **Description**:

- This endpoint allows users to update the status of an existing user task . The request must include the unique `taskId` in url to identify which task should be modified.

**Example Request**

   <img src="./assets/updateTaskStatusRequest.PNG" alt="updateTaskStatusRequest" >

**Expected Response**

- **Status**: 200 OK

- **Response Body**:

  ```
  {
      "message": "Complete REST API status has been successfully completed."
  }
  ```

  - **Response**:

      <img src="./assets/updateTaskStatusResponse.PNG" alt="updateTaskStatusResponse" >

### 6) Delete User Task

**Endpoint**: `/api/v1/deleteTask/:taskId`

**Request Method** : `DELETE`

- **Request Param**

  ```
  {
  "taskId"
  }

  ```

**Description**:

- This endpoint allows users to delete an existing user task from the database. The request requires the `taskId` of the record that needs to be deleted. Once the user task is identified and removed, it will no longer be available for retrieval or display in the system. This functionality ensures efficient management of user tasks by enabling the removal of outdated or unnecessary records.

**Example Request**

<img src="./assets/deleteTaskRequest.PNG" alt="deleteTaskRequest.PNG" >

- **Example Request Param**

  ```
  {
  "taskId" : "6739919634ef413c15bd8eb7"
  }

  ```

**Expected Response**

- **Status**: 200 OK

- **Response Body**:

  ```
  {
     "message": "6739919634ef413c15bd8eb7 has been deleted successfully."
  }
  ```

- **Response**:

  <img src="./assets/deleteTaskResponse.PNG" alt="deleteTaskResponse.PNG" >

# Conclusion

- This API simplifies managing user task with endpoints to create, update, delete, and retrieve data. By defining clear data models and leveraging RESTful principles, it aims to enhance service availability and management in user task management systems.
