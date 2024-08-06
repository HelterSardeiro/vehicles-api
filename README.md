
# Vehicles API

This API allows for CRUD operations on vehicle data, leveraging modern technologies and best practices. The MongoDB instance is hosted on MongoDB Cloud.

## Technologies Used

- Node.js
- TypeScript
- Express
- MongoDB
- Jest (for testing)

## Concepts Utilized

- RESTful API
- MVC Architecture
- Dependency Injection
- Environment Variables
- Unit and Integration Testing

## Installation

1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd vehicles
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Configuration**:
   Create a `.env` file in the root directory of the project and add the following environment variables:
   ```env
   MONGO_URI=<URI>
   PORT=8080
   FIRST_VEHICLE=1886
   ```

## Running the Application

1. **Start the application in development mode**:
   ```sh
   npm run start:dev
   ```

2. **Build the application**:
   ```sh
   npm run build
   ```

3. **Start the application in production mode**:
   ```sh
   npm start
   ```

## Running Tests

To run the tests, use the following command:
```sh
npm test
```
This will execute the test suite, including integration tests for all API endpoints.

## Docker Setup

1. **Create a `docker-compose.yml` file** in the root directory of your project with the following content:
   ```yaml
   version: '3.8'

   services:
     app:
       image: node:14
       container_name: vehicles-app
       working_dir: /usr/src/app
       volumes:
         - .:/usr/src/app
         - /usr/src/app/node_modules
       ports:
         - '${PORT}:${PORT}'
       env_file:
         - .env
       command: sh -c "npm install && npm run build && npm start"

   networks:
     default:
       name: vehicles-network
   ```

2. **Ensure you have a `.env` file** in the root of your project with the following content:
   ```env
   MONGO_URI=<URI>
   PORT=8080
   FIRST_VEHICLE=1886
   ```

3. **Build and run the Docker containers**:
   ```sh
   docker-compose up --build
   ```

4. **Access the application**:
   - The Vehicles API will be available at `http://localhost:8080` (or the port specified in your `.env` file).

## API Endpoints

Below are the available API endpoints for the Vehicles API:

### Get All Vehicles

- **Endpoint**: GET `/api/vehicles`
- **Description**: Retrieve a list of all vehicles.
- **Response**:
  ```json
  [
    {
      "id": "1",
      "licensePlate": "ABC123",
      "make": "Toyota",
      "model": "Corolla",
      "year": "2020",
      "mileage": 15000
    },
    {
      "id": "2",
      "licensePlate": "XYZ789",
      "make": "Honda",
      "model": "Civic",
      "year": "2019",
      "mileage": 25000
    }
  ]
  ```

### Get Vehicle By ID

- **Endpoint**: GET `/api/vehicles/:id`
- **Description**: Retrieve a vehicle by its ID.
- **Response**:
  ```json
  {
    "id": "1",
    "licensePlate": "ABC123",
    "make": "Toyota",
    "model": "Corolla",
    "year": "2020",
    "mileage": 15000
  }
  ```

### Create Vehicle

- **Endpoint**: POST `/api/vehicles`
- **Description**: Create a new vehicle.
- **Request Body**:
  ```json
  {
    "licensePlate": "ABC123",
    "make": "Toyota",
    "model": "Corolla",
    "year": "2020",
    "mileage": 15000
  }
  ```
- **Response**:
  ```json
  {
    "id": "1",
    "licensePlate": "ABC123",
    "make": "Toyota",
    "model": "Corolla",
    "year": "2020",
    "mileage": 15000
  }
  ```

### Update Vehicle

- **Endpoint**: PUT `/api/vehicles/:id`
- **Description**: Update an existing vehicle.
- **Request Body**:
  ```json
  {
    "licensePlate": "XYZ789",
    "make": "Honda",
    "model": "Civic",
    "year": "2019",
    "mileage": 25000
  }
  ```
- **Response**:
  ```json
  {
    "id": "1",
    "licensePlate": "XYZ789",
    "make": "Honda",
    "model": "Civic",
    "year": "2019",
    "mileage": 25000
  }
  ```

### Delete Vehicle

- **Endpoint**: DELETE `/api/vehicles/:id`
- **Description**: Delete a vehicle by its ID.
- **Response**:
  ```json
  {
    "id": "1",
    "licensePlate": "ABC123",
    "make": "Toyota",
    "model": "Corolla",
    "year": "2020",
    "mileage": 15000
  }
  ```

## Conclusion

This guide provides the necessary steps to set up, run, and test the Vehicles API locally. Make sure to configure your environment variables correctly and have a MongoDB instance running in the cloud.
