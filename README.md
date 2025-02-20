# User Management App

A simple user management web application using Node.js, Express, MySQL, and EJS for templating.

## Features
- Add users manually or generate fake users using Faker.js
- View the total number of users
- List all users
- Edit user details
- Delete users

## Technologies Used
- Node.js
- Express.js
- MySQL (using `mysql2` package)
- Faker.js (for generating fake users)
- UUID (for generating unique user IDs)
- EJS (for templating)
- Method-Override (to support HTTP PATCH & DELETE in forms)

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

### Steps to Run the Project
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up the MySQL database:
   - Create a database named `sds_app`
   - Create a `user` table with the following structure:
     ```sql
     CREATE TABLE user (
       id VARCHAR(255) PRIMARY KEY,
       username VARCHAR(100) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL
     );
     ```

4. Update database credentials in `index.js`:
   ```js
   const connection = mysql.createConnection({
       host: 'localhost',
       user: 'root',
       database: 'sds_app',
       password: 'your_password_here'
   });
   ```

5. Start the server:
   ```sh
   node index.js
   ```

6. Open your browser and visit:
   ```
   http://localhost:8000
   ```

## API Routes
### Home Page
- `GET /` - Shows the total number of users

### User Operations
- `GET /user` - Displays all users
- `GET /add` - Form to add a new user
- `POST /` - Adds a new user
- `GET /user/:id/edit` - Form to edit a user
- `PATCH /user/:id` - Updates a user’s username
- `GET /user/:id/delete` - Confirmation page for deleting a user
- `DELETE /user/:id` - Deletes a user

## Notes
- Faker.js is used to generate random user data.
- Passwords are stored in plaintext (Not secure, should be hashed in production).
- Ensure MySQL is running before starting the server.

## License
This project is licensed under the MIT License.