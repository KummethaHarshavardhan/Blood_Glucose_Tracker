# Sweety – Blood Glucose Tracker

A full-stack Blood Glucose Tracking Application built using **React, Node.js, Express.js, PostgreSQL and Prisma ORM**.

Sweety helps users record their daily blood glucose readings, monitor glucose levels, and understand their health trends through daily, month-to-date, and monthly reports.

---

## Project Overview

Sweety is designed for people who want to monitor their blood glucose levels regularly.

Users can:

- Register and securely log in.
- Record up to four glucose readings per day.
- Track fasting, after-breakfast, after-lunch, and after-dinner readings.
- View daily glucose statistics.
- Generate daily, month-to-date, and monthly reports.
- Visualize glucose trends using charts.
- Manage their reading history.

**Main Objective:** Build a secure, user-friendly application that makes blood glucose tracking simple and accessible.

---

## Features

### 1. Authentication
- User registration and login.
- Password hashing using bcrypt.
- JWT-based authentication.
- Protected API routes.
- Access token refresh and logout functionality.

### 2. Blood Glucose Management
- Add glucose readings.
- View previous readings.
- Edit existing readings.
- Delete readings.
- Store glucose values in mg/dL.

### 3. Reading Validation

The application implements the following business rules:

| Validation | Rule |
|---|---|
| Required value | Glucose value cannot be empty. |
| Minimum value | 40 mg/dL |
| Maximum value | 600 mg/dL |
| Reading limit | Maximum 4 readings per day. |
| Duplicate prevention | One reading per time slot per day. |
| Date validation | Future dates are not allowed. |

### 4. Reports and Analytics

**Daily Report**
- Highest glucose value.
- Lowest glucose value.
- Average glucose value.
- Total number of readings.
- Individual reading details.

**Month-to-Date Report**
- Statistics from the first day of the selected month through the selected date.

**Monthly Report**
- Statistics for the complete previous calendar month relative to the selected date.

### 5. Dashboard
- Today's reading summary.
- Highest, lowest, and average values.
- Reading history.
- Quick access to add readings.
- Visual glucose statistics.

### 6. User Interface
- Responsive dashboard.
- Login and registration pages.
- Reading management page.
- Reports and charts.
- Profile page.

---

## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js | Component-based user interface |
| Vite | Frontend development server and build tool |
| JavaScript (ES6+) | Application logic |
| React Router DOM | Client-side navigation |
| Axios | Backend API communication |
| Context API | Authentication state management |
| Recharts | Data visualization |
| Lucide React | Icons |
| CSS3 | Responsive styling |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API development |
| PostgreSQL | Relational database |
| Prisma ORM | Database access and migrations |
| bcrypt | Password hashing |
| JSON Web Token | Authentication |
| dotenv | Environment variable management |
| Helmet | HTTP security headers |
| CORS | Cross-origin request configuration |
| Express Validator | Request validation |

### Development and Testing Tools

- Visual Studio Code
- Git and GitHub
- Postman
- pgAdmin 4
- Prisma CLI
- npm

---

## Project Architecture

The application follows a client-server architecture with a REST API.

```text
Sweety – Blood Glucose Tracker
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── test/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── index.html
│
└── README.md
```

### Backend Architecture

The backend uses a structured MVC-style architecture:

- **Routes:** Define API endpoints.
- **Controllers:** Handle application logic and API responses.
- **Models / Prisma:** Manage database access.
- **Middleware:** Handle authentication, validation, and errors.
- **Prisma Schema:** Defines database models and relationships.

### Frontend Architecture

- **Pages:** Application screens.
- **Components:** Reusable UI elements.
- **Services:** API communication using Axios.
- **Context:** Global authentication state.
- **Hooks:** Reusable React logic.
- **Styles:** CSS styling and responsive layouts.

---

## Database Design

PostgreSQL is used as the primary relational database.

The database contains the following main entities:

### Users
Stores user account information.

- id
- name
- email
- password
- createdAt
- updatedAt

### Readings
Stores blood glucose readings.

- id
- userId
- readingDate
- timeSlot
- glucoseValue
- createdAt
- updatedAt

### Refresh Tokens
Stores hashed refresh token information for session management, if refresh-token rotation is enabled.

**Database relationships:**

- One user can have multiple glucose readings.
- Each reading belongs to exactly one user.
- A user can have multiple refresh token records.

A unique constraint on user, reading date, and time slot prevents duplicate readings for the same slot.

---

## Prerequisites

Install the following before running the project:

1. Node.js (LTS recommended).
2. npm.
3. PostgreSQL 18 or a compatible PostgreSQL version.
4. pgAdmin 4.
5. Git.
6. Visual Studio Code.

Verify installations:

```bash
node -v
npm -v
git --version
```

---

## Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/KummethaHarshavardhan/Blood_Glucose_Tracker.git

cd Blood_Glucose_Tracker
```

### Step 2: Configure PostgreSQL

Open pgAdmin 4 and connect to your PostgreSQL server.

Create two databases:

```sql
CREATE DATABASE sweety_db;
CREATE DATABASE sweety_test;
```

The first database is used by the application. The second is reserved for automated testing.

### Step 3: Configure Backend Environment Variables

Navigate to the backend directory:

```bash
cd backend
```

Create a `.env` file using `.env.example` as a reference.

Example:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/sweety_db?schema=public"

TEST_DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/sweety_test?schema=public"

ACCESS_TOKEN_SECRET="YOUR_ACCESS_SECRET"
REFRESH_TOKEN_SECRET="YOUR_REFRESH_SECRET"

ACCESS_TOKEN_EXPIRES_IN="15m"
REFRESH_TOKEN_EXPIRES_IN="7d"

PORT=7005
CLIENT_URL="http://localhost:5173"
NODE_ENV="development"
```

Replace the placeholders with your own local configuration.

Never commit `.env` files or real credentials to GitHub.

### Step 4: Install Backend Dependencies

```bash
npm install
```

### Step 5: Generate Prisma Client

```bash
npx prisma generate
```

### Step 6: Run Database Migrations

```bash
npx prisma migrate dev --name init
```

This creates the database tables based on the Prisma schema.

### Step 7: Start the Backend Server

```bash
npm start
```

Backend URL:

```text
http://localhost:7005
```

### Step 8: Configure Frontend Environment Variables

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:7005
```

### Step 9: Install Frontend Dependencies

```bash
npm install
```

### Step 10: Start the Frontend

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

Open the frontend URL in your browser.

---

## API Endpoints

All reading and report endpoints require authentication.

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Log in |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Log out |
| GET | `/api/auth/me` | Get current user |

### Reading APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/readings` | Add a reading |
| GET | `/api/readings` | Get user readings |
| GET | `/api/readings/:id` | Get a specific reading |
| PUT | `/api/readings/:id` | Update a reading |
| DELETE | `/api/readings/:id` | Delete a reading |

### Reports APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/reports/daily?date=YYYY-MM-DD` | Daily report |
| GET | `/api/reports/month-to-date?date=YYYY-MM-DD` | Month-to-date report |
| GET | `/api/reports/monthly?date=YYYY-MM-DD` | Previous-month report |

---

## Development Workflow

The project was developed in the following stages:

**Phase 1 – Requirement Analysis**
- Understand assignment requirements.
- Identify application features.
- Define validation rules and database entities.

**Phase 2 – Database Setup**
- Install PostgreSQL.
- Configure pgAdmin.
- Create application and testing databases.
- Define Prisma database schema.

**Phase 3 – Backend Development**
- Configure Node.js and Express.
- Implement authentication.
- Implement reading CRUD APIs.
- Add business validations.
- Develop reporting APIs.
- Add error handling and security middleware.

**Phase 4 – Frontend Development**
- Create React + Vite application.
- Build login and registration pages.
- Implement dashboard and reading management.
- Develop reports and charts.
- Connect frontend with backend APIs.

**Phase 5 – Integration and Testing**
- Integrate frontend and backend.
- Test registration and login.
- Test reading CRUD operations.
- Verify validation rules.
- Test report calculations.
- Verify user-specific data access.

**Phase 6 – Deployment and Documentation**
- Prepare environment configuration.
- Document installation instructions.
- Upload source code to GitHub.
- Prepare screenshots or a project demonstration.

---

## 🧪 Testing

The application should be tested for:

- Successful registration and login.
- Invalid login credentials.
- Duplicate time-slot readings.
- Empty glucose values.
- Glucose values below 40 or above 600.
- More than four readings per day.
- Future date submissions.
- Reading update and deletion.
- Daily and monthly report calculations.
- User data isolation.
- Authentication and token expiry.

Run automated tests using the test script defined in `backend/package.json`:

```bash
npm test
```

Make sure the test environment uses `sweety_test`, not the application database.

---

## Security Considerations

- Passwords are hashed using bcrypt.
- Protected APIs verify authentication tokens.
- Reading access is scoped to the authenticated user.
- Input validation is performed on the backend.
- Database access uses Prisma ORM.
- Environment variables store sensitive configuration.
- Refresh tokens should be stored securely and never exposed to frontend JavaScript.
- The frontend must not be trusted to enforce backend business rules.

---

## Future Improvements

- Advanced glucose trend analysis.
- Export reports as PDF.
- Email reminders for glucose readings.
- Doctor and patient roles.
- Notifications and alerts.
- Docker-based deployment.
- Cloud hosting and monitoring.

---

## Author

**Kummetha Harshavardhan**

- GitHub: [KummethaHarshavardhan](https://github.com/KummethaHarshavardhan)
- Project: [Blood Glucose Tracker](https://github.com/KummethaHarshavardhan/Blood_Glucose_Tracker)

---

## License

This project is developed as part of a full-stack development assignment.

---

**Sweety – Track Every Reading, Every Day. **
