# Social Network API
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
6. [License](#license)
7. [Questions](#questions)

## Description <a name="description"></a>
A full backend for a social network. Includes a database using the Mongoose API and routing via Express.js. This project uses MongoDB Atlas to form a database, and includes routing for CRUD operations on users, posts (called thoughts), and reactions to those posts.

## Installation <a name="installation"></a>
To install the application, clone the repository to your local, run "npm i" to install your packages, then run "npm run seed" if you would like to use sample data for your database. You can then run "npm run start" to start up your server. Using Insomnia, you can run CRUD operations on users and friend relations at /api/users, and run CRUD operations on thoughts at /api/thoughts. 

## Usage <a name="usage"></a>
To use the application, go to Insomnia after starting up the server. You can do Get and Post requests at /api/users to view all users and create new users. At /api/users/:userId, you can run Get, Put, and Delete requests to view, update, and delete a specific user by their ObjectId. Finally, at /api/users/:userId/friends/:friendId, you can Post and Delete to create and delete friendship relations between users. Moving on to posts, at /api/thoughts, you can run Get and Post to get all thoughts and create new thoughts. at /api/thoughts/:thoughtId, you can run Get, Put, and Delete requests to view, update, and delete thoughts, and at /api/thoughts/:thoughtId/reactions, you can Post and Delete to edit the reactions to a thought.

[Here's a video](https://drive.google.com/file/d/1KZYHmIz7L4_KhF7VdDxe9axBxcANTkq1/view) demonstrating some of the features!




## License <a name="license"></a>
This application uses the MIT license.

## Questions <a name="questions"><a>
My GitHub can be found at [GitHub.com](https://github.com/Andreasq99).

You can email me at aquist@unc.edu. Please email me with any additional questions!
