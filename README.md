# Podcast Management App

A full-stack web application that allows users to register, log in, create projects (podcasts), add episode transcripts, edit them, and manage user profiles.
The application uses **React**, **Redux**, and **Tailwind CSS** on the frontend and **Node.js**, **Express**, and **MongoDB** on the backend.

---

##  Features

###  Authentication
- User Sign Up and Login
- Protected routes using Redux Auth State

###  Home Page
- After login, users land on the Home Page
- Ability to create new **Projects (Podcasts)**

###  Project Management
- Each project can contain multiple **Episode Transcripts**
- Create, view, and manage transcripts under each project

###  Transcript Editing
- Inline or full-page transcript editing
- Auto-save or manual update options (based on configuration)

###  Profile Management
- Edit profile information
- View account email, username, etc.

###  State Management
- **Redux** is used to store:
  - Authenticated user state
  - Projects and transcripts
  - Global app state where needed

---

##  Tech Stack

### Frontend
- ReactJS
- Redux Toolkit
- React Router
- Tailwind CSS
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose

---

##  Folder Structure

```bash
.
├── client
│   ├── src
│   │   ├── components      # Reusable UI components
│   │   ├── pages           # Login, Signup, Home, Projects, etc.
│   │   ├── store           # Redux slices and store
│   │   └── js              # API calls, utilities
├── server
│   ├── routes              # user, project, transcript routes
│   ├── models              # Mongoose schemas
│   ├── controllers         # Route controllers
│   └── middleware          # Auth middleware
|   └── services            # Reusable service functions (e.g., DB ops, token handling)
