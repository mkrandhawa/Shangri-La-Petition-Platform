# Shangri-La Petitions Project

Welcome to the Shangri-La Petitions frontend folder! This project was designed to provide a platform for people from Shangri-La to share create their petitions and themselves noticed.

## Website Setup Documentation

Follow these steps to set up the Shangri-La Petitions Project website:

## Prerequisites

Before you begin, ensure you have the following software and tools installed:

- **Visual Studio Code**: Latest version available [here](https://code.visualstudio.com/download).
- **Web Browser**: Any modern web browser will do.
- **Internet Connection**: A stable connection without restrictions is needed. Please do not use the University connection as it blocks the database.
- **MongoDB Compass**: For database management, downloadable [here](https://www.mongodb.com/docs/compass/current/install/).
- **Backend Connection**: To access the functionalities. Please follow the instructions inside the Backend [README](https://github.com/mkrandhawa/Shangri-La-Petition-Platform/blob/main/Backend/README.md) file. 


### Installation Steps

#### 1. Clone the Git Repository

To clone the repository to your local machine, use the following command:

```bash
git clone https://github.com/mkrandhawa/Shangri-La-Petition-Platform
```

#### 2. Open the Project in Visual Studio Code

Navigate to the cloned repository folder and open it with Visual Studio Code.


#### 3. Get Into the **frontend** folder

Within Visual Studio Code, open a terminal and execute:

```bash
cd frontend
```

#### 5. Install Dependencies

Within Visual Studio Code, in the same terminal execute:

```bash
npm install
```

Ignore any deprecated warnings.

#### 4. Start the Server

After installing start the server:

```bash
npm start
```
A similar screen should appear: 
![alt text](<Screenshot 2025-01-04 at 5.41.15 PM.png>)

#### 5. Access the Website
Once the process is complete, the system should automatically open the browser and take you to the right page.

However, if in case that does not work, open your web browser and go to:

```
localhost:3000
```

#### 8. Login with exsisting credentials

###### Login as User

```
Email: junior@example.com
Password: test1234
```

###### Login as ADMIN

```
Email: admin@example.com
Password: test1234
```

# Application Routes Documentation

This document outlines the routes available in the IBM SkillsBuild Project and their functionalities.

## Public Routes

- `GET /`: Renders the landing page.
- `GET /login`: Renders the login form.
- `GET /signup`: Renders the signup form.

## User Routes

All the following routes are protected therefore you must be logged in to have access to them.

- `GET /account`: Renders the user's account page (protected route).
- `GET /dashboard`: Renders the user's dashboard (protected route).
- `GET /courses`: Retrieves and renders the list of courses (protected route).
- `GET /course/:slug`: Retrieves and renders a specific course based on the slug (protected route).
- `GET /review/:slug`: Submits a review for a course (protected route).
- `GET /ibmCourse/:slug`: Retrieves and renders the overview of an IBM course (protected route).
- `GET /top-3-courses`: Retrieves and renders the top 3 courses (protected route).
- `GET /account/uploadPhoto`: Renders the form to upload a photo (protected route).
- `PATCH /account/uploadPhoto`: Endpoint to upload a photo (protected route).
- `GET /account/friendsLeaderboard`: Retrieves and renders the friends leaderboard (protected route).
- `GET /account/friends`: Retrieves and renders the user's friends list (protected route).
- `GET /account/level`: Retrieves and renders the user's level (protected route).
- `GET /account/searchFriend`: Endpoint to search friends and add them into the friends list.(protected route)

## Admin Routes

The following routes are protected, therefore you must be logged in as ADMIN

- `GET /admin-dashboard`: Renders the admin dashboard (protected, admin-only route).
- `GET /admin`: Renders the admin account page (protected, admin-only route).
- `GET /admin/courses`: Retrieves and renders the list of courses with details for admin (protected, admin-only route).
- `GET /admin/stats`: Retrieves and renders statistics for all courses (protected, admin-only route).
- `GET /admin/stats/:slug`: Retrieves and renders statistics for a specific course (protected, admin-only route).
- `GET /admin/:slug`: Retrieves and renders all reviews for a course (protected, admin-only route).
- `DELETE /reviews/:id`: Deletes a specific review (protected, admin-only route).

# Common Errors and Solutions

- **Database Connection Issues**: If you're experiencing connection issues on restricted networks like University Wi-Fi, try using mobile data or a VPN.
- **JWT Malformed Error**: In developer mode, if you encounter this error, log in again.
- **Access Denied**: If you're receiving permission errors, make sure you're using the correct routes for your user level; admin routes require admin access.
- **Can't find /bundle.js.map on this server**: If you get this error, go into public/js/bundle.js file and at the end of the file have this "/# sourceMappingURL=/js/bundle.js.map"
