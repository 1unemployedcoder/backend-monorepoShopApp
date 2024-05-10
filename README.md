# Monorepo-ShopApp Backend

This repository contains the backend implementation for the Monorepo-ShopApp project. It provides RESTful API endpoints and WebSocket functionality for managing and interacting with the shop's data.

## Features

- **RESTful API**: Utilizes Express.js to create RESTful API endpoints for handling various operations related to the shop.
- **WebSocket Support**: Implements WebSocket functionality using the ws library to enable real-time communication.
- **Database Integration**: Utilizes Sequelize ORM to interact with the underlying database, facilitating data management.
- **Error Handling**: Incorporates middleware for error handling to ensure smooth operation even in case of errors.

## Prerequisites

Before running the backend, ensure you have the following installed:

- Node.js
- npm (Node Package Manager) or yarn
- PostgreSQL (or any other supported database)

## Installation

1. Clone this repository:

    ```bash
    git clone <repository_url>
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Edit a `.env` file in the root directory and define the following variables:

    ```plaintext
    DB_USERNAME=<your_database_username>
    DB_PASSWORD=<your_database_password>
    DB_DATABASE=<your_database_name>
    DB_HOST=<your_database_host>
    DB_PORT=<your_database_port>
    ```

## Usage

1. Start the backend server:

    ```bash
    npm start
    ```

2. The server will start running on the specified port (default: 5000) for RESTful API endpoints.

3. WebSocket server will be available on port 5001 for real-time communication.

## API Endpoints

## API Endpoints

### News Endpoints:

- **GET /api/news**: Retrieve all news articles.
- **GET /api/news/:id**: Retrieve a specific news article by ID.
- **POST /api/news**: Create a new news article. (Requires ADMIN role)
- **DELETE /api/news/:id**: Delete a news article by ID. (Requires ADMIN role)
- **POST /api/newsComments/:id**: Add a comment to a news article. (Requires authentication)
- **DELETE /api/newsComments/:id**: Delete a comment from a news article. (Requires authorization)

### Products Endpoints:

- **GET /api/products**: Retrieve all products.
- **GET /api/products/:id**: Retrieve a specific product by ID.
- **POST /api/products**: Create a new product. (Requires ADMIN role)
- **DELETE /api/products/:id**: Delete a product by ID. (Requires ADMIN role)
- **POST /api/productComments/:id**: Add a comment to a product. (Requires authentication)
- **DELETE /api/productComments/:id**: Delete a comment from a product. (Requires authorization)

### Product Type Endpoints:

- **GET /api/type**: Retrieve all product types.
- **POST /api/type**: Create a new product type. (Requires ADMIN role)

### User Endpoints:

- **POST /api/user/login**: Log in a user.
- **POST /api/user/registration**: Register a new user.
- **GET /api/user/auth**: Check user authentication status.
