## Chatter

**What Chatter IS?**
Chatter is a focused communication tool for organizations. It's built to facilitate efficient and effective communication within a professional setting. When a new member joins your company, they get a Chatter account to connect and collaborate with their colleagues. It's about streamlining workflows, sharing updates, and fostering a sense of community within the workplace.

**What Chatter is NOT?**
Chatter is not your typical social media platform or instant messaging app. It's not about building a network of friends, sending friend requests, or accumulating followers. It's not designed for casual conversations or social interactions with people outside your organization.

![Demo of the application](public/assets/images/demo.gif)

### Key Features

- Secure registration form with unique email and username creation.
- Seamless transition from registration to sign-in.
- Access to all members of the organization.
- Responsive design that adapts to different screen sizes.
- Full CRUD (Create, Read, Update, Delete) capabilities for messages.
- Real-time tracking and display of online/offline status for users.
- Four color themes: Light Blue, Dark, Pink, and Orange.

### Tech Stack

- Next.js (Front/Server Side).
- Tailwind CSS (Styling).
- Node.js (Back-end runtime).
- Express.js (API framework).
- MongoDB (Database).
- Socket-IO (WebSocket Connection).
- NextAuth.js (Authentication).

### Installation and Setup

1.  Clone this repository.
2.  `npm i` to install dependencies.
3.  Create a `.env` file based on the provided `.env.example` template.
4.  `npm run start` to run application.

## MongoDB Data Model

The Chatter application utilizes a MongoDB database to store and manage user data and messages. The database `chatter` contains the following collections:

## Collections

### registrations

This collection stores temporary user data during the registration process. New users create an account using this collection. After a successful registration, the following fields are transferred to the `users` collection:

- `fullname`
- `username`
- `email`
- `phone`
- `passwordHash` (A hashed version of the user's password)

### users

This collection stores the permanent user data for registered and active users. It contains the following fields:

- `fullname`
- `username`
- `image`
- `email`
- `phone`
- `passwordHash` (A hashed version of the user's password)
- `timestamps` (Timestamps for creation and updates)

### messages

This collection stores the chat messages exchanged between users. It contains the following fields:

- `sender` (User ID or other identifier of the message sender)
- `senderUsername`
- `recipientUsername`
- `content` (The message text)
- `timestamp`
- `image` (Optional image associated with the message)
- `timestamps` (Timestamps for creation and updates)

## Relationships

The `users` collection represents the core entity in the application. The `messages` collection has a relationship with the `users` collection through the `sender` field and through `senderUsername` and `recipientUsername` for easier querying. This allows the application to retrieve messages associated with specific users. The relationship is conceptually similar to a one-to-many relationship in a relational database, where one user can send multiple messages. The `registrations` collection serves as a temporary staging area, and its data gets transferred to `users`, so it does not have a direct relationship with `messages`.

## Data Flow

This structure enables the application to manage user registration, authentication, and chat functionality. New users are first created in the `registrations` collection. Upon successful registration, their information is moved to the `users` collection, granting them access to the application. Users can then send messages to each other, which are stored in the `messages` collection.

## Project Dependencies

This document outlines the Node Package Manager (NPM) dependencies used in this project.

### Important Packages

- **mongodb:** The official MongoDB driver for Node.js:

  ```bash
  npm i mongodb
  ```

- **mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js:

  ```bash
  npm i mongoose
  ```

- **bcrypt:** Used for securely hashing passwords:

  ```bash
  npm i bcrypt
  ```

- **socket-io:** Enables real-time, bidirectional communication between web clients and servers:

  ```bash
  npm i socket.io
  ```

- **socket.io-client:** The client-side library for socket-io:

  ```bash
  npm i socket.io-client
  ```

- **next-auth:** Provides authentication for Next.js applications:

  ```bash
  npm i next-auth
  ```

- **express.js:** Simplifies the process of building web applications and APIs by providing tools for routing, middleware (functions that can access and modify requests and responses), and handling HTTP requests and responses.

  ```bash
  npm i express
  ```

- **cors:** Controls how a web page from one origin (domain, protocol, port) can access resources from another origin. CORS helps prevent potential malicious activity by restricting cross-origin requests unless explicitly allowed by the server.

  ```bash
  npm i cors
  ```

- **dotenv:** Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

  ```bash
  npm i dotenv
  ```

### Useful Packages

- **react-toastify:** Provides notification functionality (e.g., toast messages) for user feedback.

  ```bash
  npm i react-toastify
  ```

- **tsparticles & tsparticles/react :** are npm packages that work together to enable you to create beautiful particle animations in your applications. **tsparticles** is the core library that powers the particle animations. **tsparticles/react** is a React-specific wrapper that makes it simple to use tsParticles within your applications.

  ```bash
  npm i @tsparticles/react
  ```

  ```bash
  npm i tsparticles
  ```

### Development Dependency

- **concurrently :** A utility for running multiple commands concurrently. Install it for development purposes with the -D flag:

  ```bash
  npm i concurrently -D
  ```

- **tailwindcss:** A utility-first CSS framework for rapidly building custom user interfaces.

  ```bash
  npm i tailwindcss
  ```

## License

This project is licensed under the MIT License - see the [See the LICENSE file for details](LICENSE) file for details.
