# Finance Tracker 

A personal finance dashboard built with React. This allows users to track income and expenses and manage access roles, all with zero backend dependencies. 

It features a custom-built, modern UI with dynamic CSS gradient meshes.

**[🛑 Click Here to View the Live App!](https://finance-tracker-ui-roan.vercel.app/user)**

##  Key Features

* **Serverless Persistence:** Utilizes browser `localStorage` as a persistent database. Your data survives page refreshes and works completely offline.
* **Role-Based Access Control:** Built-in toggles for 'Admin' and 'Viewer' modes. Viewers have read-only access, while Admins can add and delete transactions.
* **Instant Filtering & Sorting:** Client-side data processing allows for real-time sorting by Date or Amount, and filtering by Income/Expense without server lag.
* **Premium UI:** Custom-built CSS engine featuring dynamic radial gradient backgrounds and UI cards.
* **Responsive Design:** Layouts that work perfectly on desktop and mobile.

##  App Walkthrough

The application is divided into three main views, all wrapped in a custom UI:

###  1. Dashboard
The command center of your finances. 
* **At-a-Glance Metrics:** Instantly view your Total Balance, Total Income, and Total Expenses calculated in real-time.
* **Recent Activity:** A quick-look summary of your latest financial movements.
* **Visual Hierarchy:** Uses dynamic CSS gradients and floating cards to make financial data feel less like a spreadsheet and more like a premium tool.

###  2. Transactions
The core engine where the data processing happens.
* **Data Entry:** A clean, intuitive form to log new income or expenses.
* **Real-time Processing:** Client-side `.filter()` and `.sort()` methods allow you to instantly isolate Income/Expenses or order transactions by Date and Amount without a single loading spinner.
* **Smart UI:** The "Delete" button conditionally renders based on your active User Role.

###  3. User Profile
The control room for data and security settings.
* **Role Simulation :** Toggle between `Admin` and `Viewer` roles. This actively updates your permissions globally across the app and persists in memory.

##  Tech Stack

* **Frontend:** React.js 
* **Styling:** Vanilla CSS
* **State Management:** React `useState` & `useEffect`
* **Data Storage:** Browser API (`localStorage`)

##  Getting Started

To run this project locally on your machine:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YogeshReddy-19/FinanceTrackerUI.git
   ```
   
2. Navigate into the Project:
  ```bash
  cd findash
  ```

3. Install the dependencies:
  ```bash
  npm install
  ```

4. Start the development server:
  ```bash
  npm run dev
  ```

## Development Approach

This project was built with a strong focus on clean code and a seamless user experience. My core priorities were:

* **Intuitive User Experience:** Designing an interface that is easy to navigate, with instant feedback for every user action.
* **Component-Based Architecture:** Building the app using modular, reusable React components to keep the codebase organized and easy to maintain.
* **State-Driven UI:** Using React Hooks to ensure the screen updates instantly when data changes, without ever needing to refresh the page.
* **Modern Aesthetics:** Creating a clean, readable, and highly responsive custom "glassmorphism" design from scratch.

**Special attention was given to:**
* Handling data processing directly in the browser for a snappy, lag-free experience.
* Ensuring the dashboard looks great and functions perfectly on both mobile phones and desktop screens.
* Building a seamless Role-Based Access system where changing between Admin and Viewer instantly updates what the user is allowed to see and click.  

## Conclusion

This project demonstrates how a frontend application can be structured, styled, and made deeply interactive using modern tools and best practices. It proves that a highly functional, secure, and beautiful user experience can be built entirely on the client side.
