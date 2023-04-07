# Dashboard

This is the frontend application built using Vue.js and Vuetify. It provides an interactive and responsive user interface for visualizing and analyzing campaign data. The application is designed to be user-friendly, efficient, and visually appealing, allowing users to quickly gain insights from the data presented.

## Features

- Interactive and responsive data visualization using various chart types
- User-friendly filter panel for applying filters to the data
- Tabular data display with sorting, filtering, and pagination capabilities
- Dark and light mode toggle
- Efficient state management using Vuex
- Unit and integration tests using Jest and Vue Test Utils

## Components Overview

The frontend app is built using a modular and reusable component architecture. Here's a brief overview of the main components:

- **App.vue**: Main application container responsible for layout.
- **HeaderNav.vue**: Header navigation component for switching views and toggling dark/light mode
- **Dashboard.vue**: Summary view displaying key campaign metrics
- **LineChart.vue, BarChart.vue, PieChart.vue, StackedBarChart.vue, BubbleChart.vue**: Various chart components for data visualization
- **DataTable.vue**: Tabular data display with sorting, filtering, and pagination
- **FilterPanel.vue**: User-friendly filter panel for applying filters to the data

## Getting Started

To set up the frontend app locally, follow these steps:

- Clone the repository
- Navigate to the frontend app directory
- Install dependencies: `npm install` or `yarn`
- Run the development server: `npm run serve` or `yarn serve`
- Open your browser and navigate to `http://localhost:8080`

## Deployment

To build the frontend app for production, run `npm run build` or `yarn build`. This will generate a `dist` folder containing the production-ready assets, which can be deployed to your preferred hosting provider.

this project is deployed using firbase hosting
