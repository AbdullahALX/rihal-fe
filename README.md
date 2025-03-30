# Crimify

## Project Overview

Crimify is a project that handles crime reports in the area. This project helps local authorities track and visualize crime reports, providing a comprehensive full-stack solution for crime monitoring and analysis.

## Technologies Used

- **Framework**: Vite
- **UI Libraries**: React, ShadCN UI
- **Styling**: Tailwind CSS
- **Authentication & Database**: Firebase (Authentication, Firestore)
- **Form Validation**: Yup, Formik
- **Mapping**: Mapbox React
- **Programming Languages**: JavaScript, JSX
- **State Management**: Context API or other libraries (if used)
- **Backend Communication**: REST APIs or GraphQL (if applicable)

## Folder Structure

```
frontend/
│-- node_modules/       # Dependencies
│-- public/             # Public assets
│   │-- filtered_crimes.json    # Data files
│   │-- vite.svg        # Vite logo
│-- src/                # Source code
│   │-- app/            # Main application logic
│   │-- assets/         # Static files (images, data, etc.)
│   │-- components/     # Reusable UI components
│   │   │-- auth/       # Authentication components (Login, Signup)
│   │   │-- ai/         # AI-related components
│   │   │-- nav/        # Navigation components
│   │   │-- map/        # Mapping components
│   │   │-- theme/      # Theming components
│   │   │-- ui/         # UI-related components
│   │-- config/         # Configuration files
│   │-- lib/            # Utility functions
│   │-- pages/          # Application pages
│   │   │-- auth/       # Authentication pages
│   │-- App.jsx         # Main application entry
│   │-- App.css         #
```

## Installation & Setup

1. Clone the Repository:
   ```bash
   git clone https://github.com/AbdullahALX/rihal-fe.git
   ```
2. Navigate to the frontend directory:
   ```bash
   cd rihal-fe/frontend
   ```
3. Install Dependencies:
   ```bash
   npm install
   ```
4. Run the Development Server:
   ```bash
   npm run dev
   ```
   This will start the Vite development server.

## Features

- **Authentication**:
  - Login and Signup functionality that handles user authentication.
  - Stores new user data in Firebase Firestore.
- **Dynamic Dashboard**:
  - Users can interact with crime data and view reports dynamically.
  - Displays an interactive map with crime reports.
  - Captures users' location upon login to enhance user experience.
- **Filtering System**:
  - Users can filter crime data using multiple filters.
  - Filtering allows for better visualization using a legend system.
- **User Location Tracking**:
  - The user's current location is displayed as a red circle on the map.
- **Crime Reporting**:
  - Users can report new crimes and select coordinates using a draggable blue circle.
- **Advanced Mapping Features**:
  - Multiple layers for detailed map visualization.
  - Implemented clustering to group crime reports based on zoom level.
  - Clustering optimizes performance and ensures a cleaner map experience.

## Technical Aspects

Since this project is purely a frontend challenge, I aimed to eliminate the need for a backend. However, I have a backend setup for future implementation. I built an AI agent that can navigate Oman using a chatbot, and it is already functional, but due to time constraints, I did not include it in this version.

To simplify deployment, I integrated Firebase directly into the frontend, allowing me to host it without requiring a backend server. Typically, I use Render for free backend hosting, but it has drawbacks, such as putting the backend to sleep after 15 minutes of inactivity.

Additionally, the project includes actions, analytics, and reports pages, but due to limited free time, I was unable to implement them fully. However, I plan to continue working on this project after Eid for learning purposes and to enhance its functionality further.

## Contribution

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add new feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Create a Pull Request.

## Live Demo
