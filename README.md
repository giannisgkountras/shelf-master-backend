# Shelf Master Backend

A backend with RESTful APIs using Express.js and MySQL. It includes Swagger documentation for easy API exploration.

## Features

-   RESTful routes for managing users.
-   Connection to a MySQL database.
-   Swagger UI for API documentation.
-   Organized folder structure for scalability and maintainability.

## Prerequisites

Before running this project, ensure you have the following installed:

1. Node.js (v14 or higher)
   [Download and install Node.js](https://nodejs.org/en)

2. MySQL (v5.7 or higher)
   [Download and install MySQL](https://dev.mysql.com/downloads/)

3. npm (comes with Node.js)

## Setup Instructions

1. Clone the repository

```bash
git clone <repository-url>
cd <repository-folder>
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables
   Create a `.env` file in the root directory and provide the following variables:

```python
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdatabase
```

4. Set up the database

5. Run the server
   Start the development server:

```bash
node src/server.js
```

The server will be accessible at: http://localhost:3000.
