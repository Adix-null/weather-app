# A public weather app

This application allows users to select a city from a dropdown and view the weather data. The selected city and the timestamp of the action are sent to a Node.js backend, where they are logged to the console. The weather and city coordinate data is from https://open-meteo.com/ and https://simplemaps.com/data/world-cities

## Features
- Dropdown search bar with city options

- Popular city suggestions

- City weather event display

- Selected city and timestamp to the Node.js backend loging

## Technologies Used
Frontend: React, TypeScript, SCSS

Backend: Node.js

State Management: React useState for handling the selected city

## Installation & Setup
For frontend:

```
npm install
npm run dev
```

For backend:
```
npm install express body-parser cors
node server.js
```
