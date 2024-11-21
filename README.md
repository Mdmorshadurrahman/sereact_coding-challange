# Counter and Sphere App
Welcome to the Counter and Sphere App! This project is a combination of a simple counter application and a 3D sphere visualization tool.

Whether you're a reviewer or just curious, I’ve documented everything below to make it easy to follow and understand how the system works, including why I made certain decisions during implementation.

## Project Overview

The project focuses on:

- Real-time state management using WebSocket and JSON-RPC.
- Using tools like React, Redux Toolkit Query, and Three.js better experience.

## Thought Process and Implementation Details

### Backend Design

- WebSocket for Real-Time Communication: backend uses `ws` library to implement a WebSocket server which allows the frontend to maintain a persistent connection for sending and receiving JSON-RPC requests, ensuring low-latency updates.

- JSON-RPC for Request-Response Handling: I chose JSON-RPC 2.0 because it provides a structured way to define and process methods like increment, decrement, get_value, set_radius, and get_radius.

### State Management: The backend manages two state variables:

currentValue for the counter.
sphereRadius for the sphere’s radius. 
These states are updated through JSON-RPC methods and remain consistent across multiple frontend connections.

### Frontend Design
- React for the UI: React provides a simple way to build reusable components like the counter display and the 3D sphere.

- Redux Toolkit Query: I used Redux Toolkit Query for seamless integration with the WebSocket backend. It handles fetching and updating data, while also offering caching and revalidation out of the box.

- Three.js for 3D Rendering: The sphere is rendered using Three.js, with real-time updates to its radius whenever the user submits a new value.

## How to Set Up Locally
If you'd like to run the project locally, follow these steps:

1. Clone the Repository:

- `git clone https://github.com/Mdmorshadurrahman/sereact_coding_challange.git`
- `cd sereact_coding_challange`


2. Backend Setup:

- Navigate to the backend folder
- `cd sereact_coding_challange_server`

Install dependencies:
`npm install`

Start the backend:
`node index.js`

### This will start the WebSocket server on ws://localhost:5001.

3. Frontend Setup

- Navigate to the frontend folder
- `cd sereact_coding_challange_client`

Install dependencies:
`npm install`

Create a .env file with the backend WebSocket URL:
`REACT_APP_BACKEND_URL=ws://localhost:5001`

Start the frontend:

`npm start`
### This will open the app in your browser at http://localhost:3000.

## How It Works
- Counter
When you press the + or - button, the frontend sends a JSON-RPC request (increment or decrement) to the backend.
The backend updates the currentValue and sends the updated value back to the frontend.
The counter is always consistent, no matter how many clients are connected.
- Sphere
The Sphere page uses Three.js to render a 3D sphere.
When you submit a new radius value, the frontend sends a set_radius request to the backend, which updates the sphereRadius.
The frontend then fetches the updated radius using the get_radius method and re-renders the sphere.
