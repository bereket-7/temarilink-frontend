# TemariLink Frontend

A modern React application for school management system with features for student management, grade entry, and SMS messaging.

## Features

- **Authentication System**: Secure login with JWT tokens
- **Dashboard**: Overview with statistics and quick actions
- **Student Management**: Add, edit, and manage student records
- **Grade Entry**: Comprehensive grade management system
- **SMS Messaging**: Bulk SMS communication with templates
- **Responsive Design**: Mobile-first design with Tailwind CSS

## Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **State Management**: React Hooks

## Project Structure

```
src/
├── api/
│   └── client.js              # Axios configuration and interceptors
├── components/
│   └── ui/
│       ├── Button.jsx         # Reusable button component
│       ├── Input.jsx          # Reusable input component
│       └── Modal.jsx          # Reusable modal component
├── features/
│   ├── auth/
│   ├── students/
│   ├── grades/
│   └── sms/
├── layouts/
│   └── DashboardLayout.jsx    # Main dashboard layout with sidebar
├── pages/
│   ├── Login.jsx              # Login page
│   ├── Dashboard.jsx          # Dashboard overview
│   ├── Students.jsx           # Student management
│   ├── GradeEntry.jsx         # Grade entry and management
│   └── SMS.jsx                # SMS messaging interface
├── routes/
│   └── AppRoutes.jsx          # Route configuration with auth guards
├── utils/
│   ├── constants.js           # Application constants
│   └── helpers.js             # Utility functions
├── App.jsx                    # Main App component
└── main.jsx                   # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd temarilink-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your API URL in `.env`:
```
VITE_API_URL=http://localhost:3000/api
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

- `VITE_API_URL` - Backend API base URL

## API Integration

The application expects a RESTful API with the following endpoints:

### Authentication
- `POST /api/auth/login` - User login

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create new student
- `DELETE /api/students/:id` - Delete student

### Grades
- `GET /api/grades` - Get all grades
- `POST /api/grades` - Create new grade
- `GET /api/subjects` - Get subjects

### SMS
- `GET /api/sms/messages` - Get SMS history
- `POST /api/sms/send` - Send SMS
- `GET /api/sms/templates` - Get SMS templates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
