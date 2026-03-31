# TemariLink Frontend Implementation Plan (React)

This plan provides a comprehensive roadmap for building the **TemariLink** frontend using React. It includes the expected backend data structures and features based on the existing Django implementation.

---

## 📡 API Reference & Data Structures

### 1. Authentication
- **Endpoints:**
    - `POST /api/token/`: Submit `{ "phone": "...", "password": "..." }`. Returns `{ "access": "...", "refresh": "..." }`.
    - `POST /api/token/refresh/`: Submit `{ "refresh": "..." }`. Returns `{ "access": "..." }`.
- **Handling:** Store `access` in memory (state) and `refresh` in an `HttpOnly` cookie or `localStorage`.

### 2. Students
- **Endpoint:** `GET /api/students/` (Paginated)
- **Data Shape:**
  ```json
  {
      "id": "uuid",
      "full_name": "string",
      "grade": "string",
      "section": "string",
      "school": "uuid"
  }
  ```

### 3. Academics & Grades
- **Endpoint:** `GET /api/grades/`
- **Data Shape:**
  ```json
  {
      "id": "uuid",
      "student": "uuid",
      "subject": "uuid",
      "term": "uuid",
      "score": "decimal"
  }
  ```
- **Features:** "Bulk Grade Entry" matrix (Rows: Students, Columns: Subjects).

### 4. PDF Reports
- **URL:** `/reports/download/<uuid:pk>/`
- **Behavior:** Direct download of the generated PDF report card.

---

## 🚀 Implementation Phases

### Phase 1: Authentication & Secure Shell
*Goal: Secure login and persistent session.*
- Implement `AuthContext` and Axios Interceptors.
- Build a premium **Login Page**.
- Create `ProtectedRoute` and `PublicRoute` components.

### Phase 2: Core Dashboard & Layout
*Goal: High-end navigation and overview.*
- **Glassmorphism Sidebar:** For navigation.
- **Dashboard Widgets:** Total student count, average scores, and SMS delivery stats.
- **Role-based UI:** Show/hide menus based on user role (Admin/Teacher).

### Phase 3: Student Registry
*Goal: Manage student data.*
- **Searchable Table:** With filters for Grade and Section.
- **Student Profile:** View student grades and guardian info.
- **Modals:** Form for adding/editing students with field validation.

### Phase 4: Academic Matrix (Grade Entry)
*Goal: Streamlined data entry.*
- **Term Switcher:** To manage different academic periods.
- **Grade Grid:** Allow teachers to enter scores for multiple students at once.
- **Auto-Save/Drafting:** Save results to backend using `react-query` mutations.

### Phase 5: PDF Export & Communication
*Goal: Generating outcomes.*
- **Print Center:** List report cards and provide one-click PDF downloads.
- **SMS Logs:** View status of automated score notifications (already triggered by backend service).

### Phase 6: Polish, Performance & UX
- **Skeleton Screens:** For all loading states.
- **Transitions:** Using `framer-motion` for page entry/exit.
- **Error Handling:** Global toast notifications for failed API calls.

---

## 🛠️ Recommended Folder Structure

```
src/
├── api/             # API services & Axios config
├── assets/          # Static assets & global styles
├── components/      # UI primitives (Card, Button, Modal, Table)
├── features/        # Feature-based logic (auth, students, grades)
├── hooks/           # useAuth, useDebounce, etc.
├── layouts/         # Dashboard/Auth layouts
├── providers/       # Context/Provider wrappers
└── App.jsx          # Route definitions
```
